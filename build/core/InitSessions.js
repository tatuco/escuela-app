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
const typeorm_1 = require("typeorm");
class InitSessions {
}
exports.InitSessions = InitSessions;
InitSessions.initToken = () => __awaiter(void 0, void 0, void 0, function* () {
    let sessions = {};
    let users = yield typeorm_1.getConnection().query(`SELECT * FROM user WHERE token != '' AND deleted = 0;`);
    users.map((i) => (sessions[i.id] = {
        id: i.id,
        phone: i.phone,
        tag: i.tag,
        name: i.name,
        email: i.email,
        role: i.role,
        token: i.token
    }));
    const sessionsToken = sessions;
});
//# sourceMappingURL=InitSessions.js.map