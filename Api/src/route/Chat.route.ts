import { Response, Code, ResponseTemplate } from '../service/Response.service';

import {
    UserInterface,
    User,
    ChatInterface,
    Chat,
} from '../Database';

export async function CreateChat(req, res) {
    let routeResponse: Response = ResponseTemplate();

    try {
        const NewChatObject: ChatInterface = {
            user: req.session.user._id,
            symbol: req.body.symbol.toLowerCase(),
            sentiment: req.body.sentiment || '',
            strategy: req.body.strategy || '',
            expiry: req.body.expiry || '',
            message: req.body.message,
            dateCreated: Number(new Date()),
            dateUpdated: Number(new Date()),
        };

        const NewChat = new Chat(NewChatObject);
        await NewChat.save();

        routeResponse.response = await Chat.findOne({ _id: NewChat._id })
            .populate({
                path: 'user',
                model: 'User',
                select: 'username tagline photo'
            });

        req.io.to(req.body.symbol.toLowerCase()).emit('message', routeResponse.response);
    } catch (error) {
        console.log(error);
        routeResponse.code = 500;
        routeResponse.message = Code(500);
    }

    return res.status(routeResponse.code).send(routeResponse);
}

export async function GetChat(req, res) {
    let routeResponse: Response = ResponseTemplate();

    try {
        const skip = req.query.skip ? parseInt(req.query.skip) : 0;

        let query: any = {};
        if (req.query.symbol) {
            query.symbol = req.query.symbol.toLowerCase();
        }

        routeResponse.response = await Chat.find(query)
            .sort({ dateCreated: -1 })
            .skip(skip)
            .limit(6)
            .populate({
                path: 'user',
                model: 'User',
                select: 'username tagline photo'
            });
    } catch (error) {
        console.log(error);
        routeResponse.code = 500;
        routeResponse.message = Code(500);
    }

    return res.status(routeResponse.code).send(routeResponse);
}

export async function UpdateChat(req, res) {
    let routeResponse: Response = ResponseTemplate();

    try {
        routeResponse.response = await Chat.updateOne(
            { _id: req.body._id, user: req.session.user._id },
            { message: req.body.message },
        );
    } catch (error) {
        console.log(error);
        routeResponse.code = 500;
        routeResponse.message = Code(500);
    }

    return res.status(routeResponse.code).send(routeResponse);
}

export async function DeleteChat(req, res) {
    let routeResponse: Response = ResponseTemplate();

    try {
        routeResponse.response = await Chat.deleteOne({ _id: req.query._id, user: req.session.user._id });
    } catch (error) {
        console.log(error);
        routeResponse.code = 500;
        routeResponse.message = Code(500);
    }

    return res.status(routeResponse.code).send(routeResponse);
}
