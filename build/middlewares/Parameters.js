"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parameters = (req, res, next) => {
    if (req.method === 'GET') {
        req.query.take = +req.query.take || 10;
        req.query.skip = +req.query.skip || 0;
    }
    next();
};
//# sourceMappingURL=Parameters.js.map