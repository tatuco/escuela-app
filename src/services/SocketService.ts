import {SessionControl} from "../core/SessionControl";
import {Roles, User} from "../entity/User";

const socket = require('socket.io')(30200);
console.log(`Service Socket.io running por \x1b[32m%s\x1b[0m`, 30200);
const EventEmitter = require("events");
const event = new EventEmitter();
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import {Param} from "../entity/Param";
import {getConnection} from "typeorm";

socket.use((socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, config.jwtSecret, (err, decoded) => {
            if (err) {
                return next(new Error('Authentication error'));
            }
            socket.decoded = decoded;
            next();
        });
    } else {
        next(new Error('Authentication error'));
    }
}).on('connection', (client) => {
    try {
        console.log(`Client connect \x1b[32m%s\x1b[0m`, client.id, ` ${client.decoded.userId} => ${client.decoded.role}`);
        SessionControl.setSocket(client, {
            userId : client.decoded.userId,
            token: client.handshake.query.token
        });

        getConnection().query(`SELECT n.id, n.title, n.message, n.createdAt FROM notification AS n
                                        INNER JOIN notification_users_user nuu on n.id = nuu.notificationId
                                        INNER JOIN user u on nuu.userId = u.id
                                        WHERE u.id = '${client.decoded.userId}' AND nuu.done = false;`)
            .then((data) => {
            const notifications = data.map((n) => ({
                createdAt: n.createdAt, id: n.id, title: n.title, message: n.message
            }))
            console.log('Enviando Notificaciones ', notifications)
            client.emit('notifications', {
                data: notifications
            })
        }).catch((err) => {
            console.log(`Ocurrio un error al consultar notificaciones del usuario Online ${client.decoded.userId}`, err)
        })
        client.on('disconnect', async () => {
            console.log(`Client Disconnected \x1b[32m%s\x1b[0m`, client.id, ` ${client.decoded.userId} => ${client.decoded.role}`);
            SessionControl.deleteSession(client.decoded.userId)
        });
    } catch (e) {
        console.log(e);
    }
});

event.on("new-order",(data) => {
    try {
        for (let i = 0; i < data.data.orderDetails.length; i++) {
            if (SessionControl.userExists(data.data.orderDetails[i].providerId)) {
                const providerSession = SessionControl.getObjectSession(data.data.orderDetails[i].providerId);
                if (providerSession.hasOwnProperty('socket')) {
                    Param.findOne({where: {key: 'NEW_ORDER_NOTIFICATION_TO_PROVIDER'}})
                        .then((param) => {
                            if (param) {
                                console.log(`emitiando new-order => ${providerSession.id} proveedor => ${providerSession.name} id : ${providerSession.id}`)
                                providerSession.socket.emit('new-order', {
                                    data: {
                                        message: param.value || 'Producto Vendido'
                                    }
                                })
                            }
                        }).catch((err) => {
                        console.log(`Ocurrio un Error al enviar notifiacion de nuevo producto a los Emprendedores` , err)
                    })
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
    //socket.emit("new-order", data);
});

event.on("new-product",(data) => {
    try {
        const users = SessionControl.sessionsFindRole(Roles.STUDENT).filter((u) => u.hasOwnProperty('socket'))
        Param.findOne({where: {key: 'NEW_PRODUCT_NOTIFICATION_TO_SELLER'}})
            .then((param) => {
                if (param) {
                    console.log(`emitiando new-product => ${users.length} emprendedores => ${data.data.name}`)
                    users.forEach((u) => {
                        if (u.hasOwnProperty('socket')) {
                            u.socket.emit('new-product', {
                                data: {
                                    message: param.value || 'Nuevo Producto'
                                }
                            })
                        }
                    })
                }
            }).catch((err) => {
                console.log(`Ocurrio un Error al enviar notifiacion de nuevo producto a los Emprendedores` , err)
        })

    } catch (e) {
        console.log(e);
    }
    //socket.emit("new-order", data);
});

event.on('order-referer', (data) => {
    try {
        const userReferer = SessionControl.getObjectSession(data.data.userRefererId);
        if (userReferer.hasOwnProperty('socket')) {
            Param.findOne({where: {key: 'NEW_ORDER_REFERER_TO_SELLER'}})
                .then((param) => {
                    if (param) {
                        userReferer.socket.emit('order-referer', {
                            data: {
                                message: param.value
                            }
                        })
                    }
                }).catch((err) => {
                console.log(`Ocurrio un Error al enviar notifiacion.` , err)
            })
        }
    } catch (e) {
        console.log(e)
    }
})

module.exports = {event};
