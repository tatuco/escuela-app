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
const typeorm_1 = require("typeorm");
const EventEmitter = require("events");
const event = new EventEmitter();
let sessionsToken = {};
class SessionControl {
}
exports.SessionControl = SessionControl;
SessionControl.deleteSession = (userId) => {
    //    await User.update({ id: userId }, { token: '' });
    if (sessionsToken.hasOwnProperty(userId))
        delete sessionsToken[userId].socket;
};
SessionControl.initToken = () => __awaiter(void 0, void 0, void 0, function* () {
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
    sessionsToken = sessions;
});
// setSession(user, token): void {
//     User.update({ id: user.id }, { token: token }).then(() => {
//         this.sessions[user.id] = {
//             id: user.id,
//             phone: user.phone,
//             tag: user.tag,
//             photo: user.photo,
//             name: user.name,
//             email: user.email,
//             roleId: user.roleId,
//             token: token
//         };
//     }).catch((e) => {
//         console.log(e)
//     });
// }
SessionControl.storeSession = (user, token) => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.User.update({ id: user.id }, { token: token });
    if (!sessionsToken.hasOwnProperty(user.id)) {
        sessionsToken[user.id] = {
            id: user.id,
            phone: user.phone,
            tag: user.tag,
            photo: user.photo,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token
        };
    }
    else {
        // const {event} = require("../services/SocketService");
        // event.emit("new-session", {
        //     user: user.id
        // });
        sessionsToken[user.id].token = token;
    }
});
SessionControl.setSocket = (socket, object) => {
    //   console.log(sessionsToken);
    if (sessionsToken.hasOwnProperty(object.userId)) {
        const userSession = sessionsToken[object.userId];
        if (userSession.hasOwnProperty('socket') && userSession.token !== object.token) {
            console.log(`new-session => Emitiendo Evento a ${object.userId}`);
            userSession.socket.emit('new-session', {
                user: object.userId,
                message: `Has Iniciado Session en otro Dispositivo!`
            });
        }
        sessionsToken[object.userId].socket = socket;
    }
    //      console.log("----")
    //  console.log(sessionsToken);
};
SessionControl.sessionsFindRole = (role) => {
    let results = [];
    for (const userId in sessionsToken) {
        if (sessionsToken[userId].role === role)
            results.push(sessionsToken[userId]);
    }
    return results;
};
SessionControl.getSocketId = (userId) => {
    if (sessionsToken.hasOwnProperty(userId) && sessionsToken[userId].hasOwnProperty('socket'))
        return sessionsToken[userId].socket;
    else
        return false;
};
SessionControl.userExistsAndToken = (userId, token) => {
    return sessionsToken.hasOwnProperty(userId) && sessionsToken[userId].token === token;
};
SessionControl.userExists = (userId) => {
    return sessionsToken.hasOwnProperty(userId);
};
SessionControl.getObjectSession = (userId) => {
    return sessionsToken[userId];
};
SessionControl.getObjectRole = (res) => {
    return res.locals.jwtPayload.role;
};
SessionControl.getObjectToken = (res) => {
    return res.locals.jwtPayload;
};
//# sourceMappingURL=SessionControl.js.map