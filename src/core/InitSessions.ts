import {getConnection, getRepository, Not} from "typeorm";

export class InitSessions {
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
        const sessionsToken = sessions;

    }
}
