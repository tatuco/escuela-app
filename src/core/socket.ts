const socket = require('socket.io')

export class Socket {

    static setServer = (server) => {
        return new Promise((resolve => {
            socket(server)
            resolve(socket)
        }))
    }

    static getSocket = () => {
        return socket
    }
}
