import { Response, Code, ResponseTemplate } from '../service/Response.service';

import {
    UserInterface,
    User,
    StrikeInterface,
    Strike,
} from '../Database';

export async function CreateStrike(req, res) {
    let routeResponse: Response = ResponseTemplate();

    try {
        await Strike.deleteMany({
            user: req.session.user._id,
            symbol: req.body.symbol.toLowerCase(),
            expiry: req.body.expiry,
            strike: req.body.strike,
        });

        const NewStrikeObject: StrikeInterface = {
            user: req.session.user._id,
            symbol: req.body.symbol.toLowerCase(),
            expiry: req.body.expiry,
            strike: req.body.strike,
            sentiment: req.body.sentiment,
            note: req.body.note || '',
            dateCreated: Number(new Date()),
            dateUpdated: Number(new Date()),
        };

        const NewStrike = new Strike(NewStrikeObject);
        await NewStrike.save()

        routeResponse.response = await Strike
            .findOne({ _id: NewStrike._id })
            .populate({
                path: 'user',
                model: 'User',
                select: 'username tagline photo'
            });

        req.io.to(`symbol-${req.body.symbol}`).emit('strike', routeResponse.response);
        req.io.to(`home`).emit('home-strike', routeResponse.response);
    } catch (error) {
        console.log(error);
        routeResponse.code = 500;
        routeResponse.message = Code(500);
    }

    return res.status(routeResponse.code).send(routeResponse);
}

export async function GetStrikes(req, res) {
    let routeResponse: Response = ResponseTemplate();

    try {
        routeResponse.response = await Strike
            .find({
                symbol: req.query.symbol.toLowerCase(),
                expiry: req.query.expiry,
            });
    } catch (error) {
        console.log(error);
        routeResponse.code = 500;
        routeResponse.message = Code(500);
    }

    return res.status(routeResponse.code).send(routeResponse);
}

export async function RecentStrikes(req, res) {
    let routeResponse: Response = ResponseTemplate();

    try {
        routeResponse.response = await Strike
            .find()
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
