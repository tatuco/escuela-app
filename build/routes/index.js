"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("./auth");
const user_1 = require("./user");
const email_1 = require("./email");
const api_1 = require("./api");
const routes = express_1.Router();
routes.get("/api", (req, res) => {
    return res.send({
        api: "Service",
        version: "1.0.0"
    });
});
routes.use("/api", auth_1.default);
routes.use("/api/users", user_1.default);
routes.use("/api/email", email_1.default);
routes.use("/api", api_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map