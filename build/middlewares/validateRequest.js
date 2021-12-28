"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CacheService_1 = require("../core/CacheService");
const logger_1 = require("./logger");
exports.validateRequest = (req, res, next) => {
    try {
        if (req.method === 'POST' || req.method === 'PUT') {
            const request = {
                method: req.method,
                url: req.url,
                body: req.body,
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
            };
            const validator = CacheService_1.CacheService.validateRequest(request);
            if (!validator) {
                logger_1.writeLog(`Request Multiple => ${JSON.stringify(request)}`);
                return res.status(422).send({
                    status: false,
                    message: "Peticion enviada multiples veces"
                });
            }
        }
    }
    catch (e) {
        return res.status(401).send({
            status: false,
            message: "Request Invalido",
            exception: e
        });
    }
    next();
};
//# sourceMappingURL=validateRequest.js.map