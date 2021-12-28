"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config_1 = require("../config/config");
// const fs = require('fs')
// const path = require('path')
// const moment = require('moment')
const getActualRequestDurationInMilliseconds = start => {
    const NS_PER_SEC = 1e9; //  convert to nanoseconds
    const NS_TO_MS = 1e6; // convert to milliseconds
    const diff = process.hrtime(start);
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};
exports.Logger = (req, res, next) => {
    try {
        let token = req.headers.hasOwnProperty('authorization') ? req.headers['authorization'] : false;
        let user = {};
        let infoUserLog = ``;
        if (token) {
            user = jwt.verify(req.headers.authorization.replace("Bearer ", ""), config_1.default.jwtSecret);
            infoUserLog = `user: (${user.userId} => ${user.email} ${user.role})`;
        }
        let method = req.method;
        let url = req.url;
        let status = res.statusCode;
        const start = process.hrtime();
        const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
        let error = '';
        if (status >= 400) {
            error += `Error => ${res.message} Exception => ${JSON.stringify(res.exception)}`;
        }
        let log = `${method}:${url} ${status} ${infoUserLog} data: ${JSON.stringify(req.body)} ${error} ${durationInMilliseconds.toLocaleString()} ms`;
        // console.log(log);
        writeLog(log);
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({
            status: false,
            message: "Sesion Expirada",
            exception: e
        });
    }
    next();
};
function writeLog(log) {
    let current_datetime = new Date();
    let formatted_date = current_datetime.getFullYear() +
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
    console.log(`[${formatted_date}] ` + log + "\n");
    //  fs.appendFileSync(route, `[${formatted_date}] `+log + "\n")
}
exports.writeLog = writeLog;
//# sourceMappingURL=logger.js.map