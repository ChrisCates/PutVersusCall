import { Tradier } from '../Config';

import { Response, Code, ResponseTemplate } from '../service/Response.service';

export async function GetQuote(req, res) {
    let routeResponse: Response = ResponseTemplate();

    try {
        if (req.query.symbol) {
            routeResponse.response = await Tradier.quote(req.query.symbol);
        } else {
            routeResponse.code = 400;
            routeResponse.message = 'Please provide a valid symbol';
        }
    } catch (error) {
        console.log(error);
        routeResponse.code = 500;
        routeResponse.message = Code(500);
    }

    return res.status(routeResponse.code).send(routeResponse);
}

export async function GetOptions(req, res) {
    let routeResponse: Response = ResponseTemplate();

    try {
        if (req.query.symbol) {
            const expiry = await Tradier.optionexpirations(req.query.symbol);

            /*
            const chain = await Tradier.optionchain(
                req.query.symbol,
                req.query.expiry ? req.query.expiry : expiry.date[0],
            );
            */

            const strike = await Tradier.optionstrikes(
                req.query.symbol,
                req.query.expiry ? req.query.expiry : expiry.date[0],
            );

            routeResponse.response = { expiry, strike, };
        } else {
            routeResponse.code = 400;
            routeResponse.message = 'Please provide a valid symbol';
        }
    } catch (error) {
        console.log(error);
        routeResponse.code = 500;
        routeResponse.message = Code(500);
    }

    return res.status(routeResponse.code).send(routeResponse);
}
