"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function namespace(name) {
    return name.replace(/(\b|\.)\w/g, l => l.toUpperCase()).replace('.', '');
}
exports.namespace = namespace;
function slashNotation(string, object) {
    return string.split('/').reduce((o, i) => o[i], object);
}
exports.slashNotation = slashNotation;
function validator(data, validations) {
}
exports.validator = validator;
function getTypeNumber(number) {
    if (Number.isInteger(number))
        return "integer";
    else
        return "decimal";
}
exports.getTypeNumber = getTypeNumber;
function getRandomArbitrary(min, max) {
    return (Math.random() * (max - min) + min).toString() + (Math.random() * (max - min) + min).toString();
}
exports.getRandomArbitrary = getRandomArbitrary;
function validateArrayObjects(objectValidate, arrayObjects, nameProperty) {
    let errors = [];
    if (arrayObjects.length === 0) {
        // return errors
        errors.push("El Array " + nameProperty + " esta vacio");
    }
    let arrObject = objectValidate.replace("{", "").replace("}", "").split(",");
    let obj = {};
    arrObject.forEach((i) => {
        const item = i.split("=");
        obj[item[0]] = item[1];
    });
    for (let i = 0; i < arrayObjects.length; i++) {
        for (const prop in obj) {
            if (!arrayObjects[i].hasOwnProperty(prop)) {
                errors.push("La propiedad " + prop + " no existe en el objeto numero " + i + " del array " + nameProperty);
            }
            switch (obj[prop]) {
                case 'string':
                    if (typeof arrayObjects[i][prop] !== 'string') {
                        errors.push("La propiedad " + prop + " del objeto numero " + i + " del array " + nameProperty + " debe ser un string, valor enviado de tipo " + arrayObjects[i][prop]);
                    }
                    break;
                case 'integer':
                    if (typeof arrayObjects[i][prop] === 'number') {
                        if (getTypeNumber(arrayObjects[i][prop]) !== 'integer') {
                            errors.push("La propiedad " + prop + " del objeto numero " + i + " del array " + nameProperty + " debe ser un integer, valor enviado " + arrayObjects[i][prop]);
                        }
                    }
                    else
                        errors.push("La propiedad " + prop + " del objeto numero " + i + " del array " + nameProperty + " debe ser un integer, valor enviado " + arrayObjects[i][prop]);
                    break;
                case 'number':
                    if (typeof arrayObjects[i][prop] !== 'number')
                        errors.push("La propiedad " + prop + " del objeto numero " + i + " del array " + nameProperty + " debe ser un numero, valor enviado " + arrayObjects[i][prop]);
                    break;
                case 'decimal':
                    if (typeof arrayObjects[i][prop] === 'number') {
                        if (getTypeNumber(arrayObjects[i][prop]) !== 'decimal') {
                            errors.push("La propiedad " + prop + " del objeto numero " + i + " del array " + nameProperty + " debe ser un decimal, valor enviado " + arrayObjects[i][prop]);
                        }
                    }
                    else
                        errors.push("La propiedad " + prop + " del objeto numero " + i + " del array " + nameProperty + " debe ser un decimal, valor enviado " + arrayObjects[i][prop]);
                    break;
                default:
                    if (typeof arrayObjects[i][prop] !== objectValidate[prop]) {
                        errors.push("La propiedad " + prop + " del objeto numero " + i + " del array " + nameProperty + " debe ser un " + objectValidate[prop] + ", valor enviado de tipo " + arrayObjects[i][prop]);
                    }
            }
        }
    }
    return errors;
}
exports.validateArrayObjects = validateArrayObjects;
function getPermission(endpoint, method) {
    try {
        const entity = endpoint.substring(1).split("/")[0];
        let dos = "", tres = "";
        console.log(endpoint.substring(1).split("/")[1], endpoint.substring(1).split("/")[2], endpoint);
        if (endpoint.substring(1).split("/")[1] !== "") {
            dos = endpoint.substring(1).split("/")[1];
            if (endpoint.substring(1).split("/")[2] !== "") {
                tres = endpoint.substring(1).split("/")[2];
            }
        }
        let crud = "index";
        switch (method) {
            case "GET":
                if (new RegExp("([0-9]+)").test(endpoint.substring(1).split("/")[1]))
                    crud = "show";
                else
                    crud = "index";
                break;
            case "POST":
                crud = "store";
                break;
            case "DELETE":
                crud = "destroy";
                break;
            case "PUT":
                crud = "update";
                break;
        }
        console.log(entity, dos, tres);
        return entity + "." + dos !== "" ? dos + "." : "" + tres !== "" ? tres + "." : "" + crud;
    }
    catch (e) {
        console.log(e);
    }
}
exports.getPermission = getPermission;
function verifyAccess(permissionRequired, permissionsUser) {
    // console.log(typeof permissionRequired);
    // console.log(permissionsUser.filter((it =>  it.code === permissionRequired)));
    return permissionsUser.filter((it => it.code === permissionRequired || "all.all")).length > 0;
}
exports.verifyAccess = verifyAccess;
function handleError(res, err) {
    // Prints error in console
    // console.log(process.env.NODE_ENV);
    exports.Logger(res, err);
    if (process.env.NODE_ENV === 'dev') {
        console.log(err);
        return res.status(err.code ? err.code : err.status || 500).json({
            status: err.code ? err.code : err.status || 500,
            message: err.message || "Error Server",
            exception: err
        });
    }
    else {
        console.log(err);
        return res.status(err.code ? err.code : err.status || 500).json({
            status: err.code ? err.code : err.status || 500,
            message: err.message || "Error Server",
            exception: err
        });
    }
}
exports.handleError = handleError;
function notFound(res, message) {
    return res.send({
        message: message != "" ? message : "Not Found"
    }).status(404);
}
exports.notFound = notFound;
function response(res, status, object = {}) {
    return res.status(status || 200).json(object);
}
exports.response = response;
function formatPermission(endpoint, method) {
    const array = endpoint.substr(1).split("/");
    let permission = "", cont = 0;
    array.forEach((it) => {
        cont++;
        permission += it.substr(0) + ".";
    });
    let crud = "index";
    switch (method) {
        case "GET":
            if (new RegExp("([0-9]+)").test(endpoint.substring(1).split("/")[endpoint.length]))
                crud = "show";
            else
                crud = "index";
            break;
        case "POST":
            crud = "store";
            break;
        case "DELETE":
            crud = "destroy";
            break;
        case "PUT":
            crud = "update";
            break;
    }
    return permission + crud;
}
exports.formatPermission = formatPermission;
function currentAccountId(res) {
    const user = res.locals.jwtPayload;
    return user.accountId;
}
exports.currentAccountId = currentAccountId;
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const getActualRequestDurationInMilliseconds = start => {
    const NS_PER_SEC = 1e9; //  convert to nanoseconds
    const NS_TO_MS = 1e6; // convert to milliseconds
    const diff = process.hrtime(start);
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};
exports.Logger = (res, err) => {
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
    const start = process.hrtime();
    const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
    let log = `[${formatted_date}] ${err.code ? err.code : err.status || 500}  Error => (${err.message || "Error Server"}) ${durationInMilliseconds.toLocaleString()} ms`;
    console.log(log);
    //   const route = path.join(__dirname, `../logs/bearapp__${moment().format('YYYY_MM_DD')}__api.log`);
    //  mkdirSync(route)
    //  fs.appendFileSync(route, log + "\n");
};
exports.mkdirSync = function (path) { try {
    fs.mkdirSync(path);
}
catch (e) {
    if (e.code != 'EEXIST')
        throw e;
} };
//# sourceMappingURL=Utils.js.map