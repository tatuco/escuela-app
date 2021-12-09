import {CacheService} from "../core/CacheService";
import {writeLog} from "./logger";

export const validateRequest = (req, res, next) => { //middleware function
    try {
        if (req.method === 'POST' || req.method === 'PUT') {
            const request = {
                method: req.method,
                url: req.url,
                body: req.body,
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
            }
            const validator = CacheService.validateRequest(request)
            if (!validator) {
                writeLog(`Request Multiple => ${JSON.stringify(request)}`)
                return res.status(422).send({
                    status: false,
                    message: "Peticion enviada multiples veces"
                });
            }
        }
    } catch (e) {
        return res.status(401).send({
            status: false,
            message: "Request Invalido",
            exception: e
        });
    }

    next();
};