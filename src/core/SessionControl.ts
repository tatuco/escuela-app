import {User} from "../entity/User";
import {getConnection} from "typeorm";
const EventEmitter = require("events");
const event = new EventEmitter();
let sessionsToken = {};
export class SessionControl {

    static deleteSession = (userId) => {
        //    await User.update({ id: userId }, { token: '' });
       if (sessionsToken.hasOwnProperty(userId))
             delete sessionsToken[userId].socket;
    };

    static initToken = async () => {
        let sessions = {};
        let users = await getConnection().query(`SELECT * FROM user WHERE token != '' AND deleted = 0;`);
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
    }

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

    static storeSession = async (user, token) => {
        await User.update({id: user.id}, {token: token});
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
        } else {
            // const {event} = require("../services/SocketService");
            // event.emit("new-session", {
            //     user: user.id
            // });
            sessionsToken[user.id].token = token;
        }
    };

    static setSocket = (socket, object) => {
        //   console.log(sessionsToken);
        if (sessionsToken.hasOwnProperty(object.userId)) {
            const userSession = sessionsToken[object.userId];
            if (userSession.hasOwnProperty('socket') && userSession.token !== object.token) {
                console.log(`new-session => Emitiendo Evento a ${object.userId}`)
                userSession.socket.emit('new-session', {
                    user: object.userId,
                    message: `Has Iniciado Session en otro Dispositivo!`
                })
            }
            sessionsToken[object.userId].socket = socket;
        }
        //      console.log("----")
        //  console.log(sessionsToken);
    }

    static sessionsFindRole = (role) => {
        let results = []
        for (const userId in sessionsToken) {
            if (sessionsToken[userId].role === role)
                results.push(sessionsToken[userId])
        }
        return results
    }

    static getSocketId = (userId) => {
        if (sessionsToken.hasOwnProperty(userId) && sessionsToken[userId].hasOwnProperty('socket'))
            return sessionsToken[userId].socket;
        else
            return false;
    }

    static userExistsAndToken = (userId, token) => {
        return sessionsToken.hasOwnProperty(userId) && sessionsToken[userId].token === token;
    }

    static userExists = (userId) => {
        return sessionsToken.hasOwnProperty(userId);
    }

    static getObjectSession = (userId) => {
        return sessionsToken[userId];
    };

    static getObjectRole = (res) => {
        return res.locals.jwtPayload.role;
    };

    static getObjectToken = (res) => {
        return res.locals.jwtPayload;
    };
}
