"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket = require('socket.io');
class Socket {
}
exports.Socket = Socket;
Socket.setServer = (server) => {
    return new Promise((resolve => {
        socket(server);
        resolve(socket);
    }));
};
Socket.getSocket = () => {
    return socket;
};
//# sourceMappingURL=socket.js.map