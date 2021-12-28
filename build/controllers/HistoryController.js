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
const Utils_1 = require("../core/Utils");
const History_1 = require("../entity/History");
const User_1 = require("../entity/User");
class HistoryController {
}
exports.HistoryController = HistoryController;
HistoryController.index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let doWhere = { deleted: false };
        const authUser = res.locals.jwtPayload;
        if (!authUser.role.startsWith(User_1.Roles.ADMIN))
            doWhere.userId = authUser.userId;
        const history = yield History_1.History.find({
            relations: ['user', 'file'],
            where: doWhere
        });
        return res.send({
            data: history
        }).status(200);
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
//# sourceMappingURL=HistoryController.js.map