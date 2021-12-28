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
const SessionControl_1 = require("../core/SessionControl");
const User_1 = require("../entity/User");
const socket = require('socket.io')(30200);
console.log(`Service Socket.io running por \x1b[32m%s\x1b[0m`, 30200);
const EventEmitter = require("events");
const event = new EventEmitter();
const jwt = require("jsonwebtoken");
const config_1 = require("../config/config");
const Param_1 = require("../entity/Param");
const typeorm_1 = require("typeorm");
socket.use((socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, config_1.default.jwtSecret, (err, decoded) => {
            if (err) {
                return next(new Error('Authentication error'));
            }
            socket.decoded = decoded;
            next();
        });
    }
    else {
        next(new Error('Authentication error'));
    }
}).on('connection', (client) => {
    try {
        console.log(`Client connect \x1b[32m%s\x1b[0m`, client.id, ` ${client.decoded.userId} => ${client.decoded.role}`);
        SessionControl_1.SessionControl.setSocket(client, {
            userId: client.decoded.userId,
            token: client.handshake.query.token
        });
        typeorm_1.getConnection().query(`SELECT n.id, n.title, n.message, n.createdAt FROM notification AS n
                                        INNER JOIN notification_users_user nuu on n.id = nuu.notificationId
                                        INNER JOIN user u on nuu.userId = u.id
                                        WHERE u.id = '${client.decoded.userId}' AND nuu.done = false;`)
            .then((data) => {
            const notifications = data.map((n) => ({
                createdAt: n.createdAt, id: n.id, title: n.title, message: n.message
            }));
            console.log('Enviando Notificaciones ', notifications);
            client.emit('notifications', {
                data: notifications
            });
        }).catch((err) => {
            console.log(`Ocurrio un error al consultar notificaciones del usuario Online ${client.decoded.userId}`, err);
        });
        client.on('disconnect', () => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`Client Disconnected \x1b[32m%s\x1b[0m`, client.id, ` ${client.decoded.userId} => ${client.decoded.role}`);
            SessionControl_1.SessionControl.deleteSession(client.decoded.userId);
        }));
    }
    catch (e) {
        console.log(e);
    }
});
event.on("new-order", (data) => {
    try {
        for (let i = 0; i < data.data.orderDetails.length; i++) {
            if (SessionControl_1.SessionControl.userExists(data.data.orderDetails[i].providerId)) {
                const providerSession = SessionControl_1.SessionControl.getObjectSession(data.data.orderDetails[i].providerId);
                if (providerSession.hasOwnProperty('socket')) {
                    Param_1.Param.findOne({ where: { key: 'NEW_ORDER_NOTIFICATION_TO_PROVIDER' } })
                        .then((param) => {
                        if (param) {
                            console.log(`emitiando new-order => ${providerSession.id} proveedor => ${providerSession.name} id : ${providerSession.id}`);
                            providerSession.socket.emit('new-order', {
                                data: {
                                    message: param.value || 'Producto Vendido'
                                }
                            });
                        }
                    }).catch((err) => {
                        console.log(`Ocurrio un Error al enviar notifiacion de nuevo producto a los Emprendedores`, err);
                    });
                }
            }
        }
    }
    catch (e) {
        console.log(e);
    }
    //socket.emit("new-order", data);
});
event.on("new-product", (data) => {
    try {
        const users = SessionControl_1.SessionControl.sessionsFindRole(User_1.Roles.STUDENT).filter((u) => u.hasOwnProperty('socket'));
        Param_1.Param.findOne({ where: { key: 'NEW_PRODUCT_NOTIFICATION_TO_SELLER' } })
            .then((param) => {
            if (param) {
                console.log(`emitiando new-product => ${users.length} emprendedores => ${data.data.name}`);
                users.forEach((u) => {
                    if (u.hasOwnProperty('socket')) {
                        u.socket.emit('new-product', {
                            data: {
                                message: param.value || 'Nuevo Producto'
                            }
                        });
                    }
                });
            }
        }).catch((err) => {
            console.log(`Ocurrio un Error al enviar notifiacion de nuevo producto a los Emprendedores`, err);
        });
    }
    catch (e) {
        console.log(e);
    }
    //socket.emit("new-order", data);
});
event.on('order-referer', (data) => {
    try {
        const userReferer = SessionControl_1.SessionControl.getObjectSession(data.data.userRefererId);
        if (userReferer.hasOwnProperty('socket')) {
            Param_1.Param.findOne({ where: { key: 'NEW_ORDER_REFERER_TO_SELLER' } })
                .then((param) => {
                if (param) {
                    userReferer.socket.emit('order-referer', {
                        data: {
                            message: param.value
                        }
                    });
                }
            }).catch((err) => {
                console.log(`Ocurrio un Error al enviar notifiacion.`, err);
            });
        }
    }
    catch (e) {
        console.log(e);
    }
});
module.exports = { event };
//# sourceMappingURL=SocketService.js.map