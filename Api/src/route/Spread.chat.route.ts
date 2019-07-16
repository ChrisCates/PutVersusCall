import { Response, Code, ResponseTemplate } from '../service/Response.service';

import {
    UserInterface,
    User,
    SpreadChatInterface,
    SpreadChat,
} from '../Database';

export async function CreateSpreadChat(req, res) {
    let routeResponse: Response = ResponseTemplate();

    try {
        const NewSpreadChatObject: SpreadChatInterface = {
            user: req.session.user._id,
            spread: req.body.spread,
            message: req.body.message,
            dateCreated: Number(new Date()),
            dateUpdated: Number(new Date()),
        };

        const NewSpreadChat = new SpreadChat(NewSpreadChatObject);
        await NewSpreadChat.save();

        routeResponse.response = NewSpreadChat;
    } catch (error) {
        console.log(error);
        routeResponse.code = 500;
        routeResponse.message = Code(500);
    }

    return res.status(routeResponse.code).send(routeResponse);
}

export async function GetSpreadChat(req, res) {
    let routeResponse: Response = ResponseTemplate();

    try {
        routeResponse.response = await SpreadChat
            .find({ spread: req.query.spread })
            .sort({ dateCreated: -1 })
            .limit(8)
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
