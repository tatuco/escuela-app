"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entity/User");
exports.checkUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const role = res.locals.jwtPayload.role;
    if ([User_1.Roles.ADMIN].filter(i => i === role).length > 0)
        next();
    if (req.params.id === res.locals.jwtPayload.userId)
        next();
    else
        return res.status(401).send({
            message: "No Autorizado! para acceder a este recurso requires rol Admin o Ser el usuario"
        });
});
//# sourceMappingURL=checkUser.js.map