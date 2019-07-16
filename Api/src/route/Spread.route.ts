import { Response, Code, ResponseTemplate } from '../service/Response.service';

import {
    UserInterface,
    User,
    SpreadInterface,
    Spread,
} from '../Database';

export async function CreateSpread(req, res) {
    let routeResponse: Response = ResponseTemplate();

    try {
        const NewSpreadObject: SpreadInterface = {
            user: req.session.user._id,
            symbol: req.body.symbol,
            expiry: req.body.expiry,
            title: req.body.title,
            description: req.body.description,
            data: req.body.data,
            dateCreated: Number(new Date()),
            dateUpdated: Number(new Date()),
        };

        const NewSpread = new Spread(NewSpreadObject);
        await NewSpread.save();

        routeResponse.response = NewSpread;
    } catch (error) {
        console.log(error);
        routeResponse.code = 500;
        routeResponse.message = Code(500);
    }

    return res.status(routeResponse.code).send(routeResponse);
}

export async function MySpreads(req, res) {
    let routeResponse: Response = ResponseTemplate();

    try {
        routeResponse.response = await Spread
            .find({ user: req.session.user._id, symbol: req.query.symbol })
            .sort({ dateCreated: -1 });
    } catch (error) {
        console.log(error);
        routeResponse.code = 500;
        routeResponse.message = Code(500);
    }

    return res.status(routeResponse.code).send(routeResponse);
}

export async function RecentSpreads(req, res) {
    let routeResponse: Response = ResponseTemplate();

    try {
        let query: any = {};
        if (req.query.symbol) {
            query.symbol = req.query.symbol;
        }

        routeResponse.response = await Spread
            .find(query)
            .sort({ dateCreated: -1 })
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

export async function SpreadById(req, res) {
    let routeResponse: Response = ResponseTemplate();

    try {
        routeResponse.response = await Spread
            .findOne({ _id: req.params._id })
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
