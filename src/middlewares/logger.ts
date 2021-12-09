import {mkdirSync} from "../core/Utils";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

// const fs = require('fs')
// const path = require('path')
// const moment = require('moment')

const getActualRequestDurationInMilliseconds = start => {
    const NS_PER_SEC = 1e9; //  convert to nanoseconds
    const NS_TO_MS = 1e6; // convert to milliseconds
    const diff = process.hrtime(start);
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};
export const Logger = (req, res, next) => { //middleware function
    try {
        let token = req.headers.hasOwnProperty('authorization') ? req.headers['authorization'] : false;
        let user: any = {}
        let infoUserLog = ``
        if (token) {
            user = jwt.verify(req.headers.authorization.replace("Bearer ", ""), config.jwtSecret);
            infoUserLog = `user: (${user.userId} => ${user.email} ${user.role})`
        }
        let method = req.method;
        let url = req.url;
        let status = res.statusCode;
        const start = process.hrtime();
        const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
        let error = ''
        if (status >= 400)
        {
            error+=`Error => ${res.message} Exception => ${JSON.stringify(res.exception)}`
        }
        let log = `${method}:${url} ${status} ${infoUserLog} data: ${JSON.stringify(req.body)} ${error} ${durationInMilliseconds.toLocaleString()} ms`;
        // console.log(log);
        writeLog(log)
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            status: false,
            message: "Sesion Expirada",
            exception: e
        });
    }
    next();
};

export function writeLog (log) {
    let current_datetime = new Date();
    let formatted_date =
        current_datetime.getFullYear() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getDate() +
        " " +
        current_datetime.getHours() +
        ":" +
        current_datetime.getMinutes() +
        ":" +
        current_datetime.getSeconds();
  //  const route = path.join(__dirname, `../logs/bearapp__${moment().format('YYYY_MM_DD')}__api.log`);
    console.log(`[${formatted_date}] `+log + "\n")
  //  fs.appendFileSync(route, `[${formatted_date}] `+log + "\n")

}

