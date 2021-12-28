"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./Utils");
class Validator {
    static make(request, validations) {
        try {
            const objectBody = request.body;
            //  console.log(objectBody);
            let errors = [], res = false, objectValidated = {};
            for (let it in validations) {
                let validationsArray = validations[it].split("|");
                for (let i in validationsArray) {
                    let valueMin = 0, valueMax = 0, type = "";
                    if (objectBody.hasOwnProperty(it))
                        objectValidated[it] = objectBody[it];
                    // console.log(objectBody.hasOwnProperty(it), typeof validationsArray[i] === 'string',validationsArray[i].indexOf("min:") !== -1, validationsArray[i], objectBody[it], (validationsArray[i].indexOf("enum:") !== -1));
                    if (objectBody.hasOwnProperty(it) && (it === 'image' || it === 'images')) {
                        //   console.log('Viene imagen')
                        if (Array.isArray(objectBody[it])) {
                            for (let i = 0; i < objectBody[it].length; i++) {
                                if (objectBody[it][i]) {
                                    let matches = objectBody[it][i].match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                                    //    console.log(matches)
                                    if (matches === null || matches.length !== 3) {
                                        errors.push("Formato de imagen Invalido");
                                    }
                                }
                            }
                        }
                        else {
                            let matches = objectBody[it].match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                            if (matches.length !== 3) {
                                errors.push("Formato de imagen Invalido");
                            }
                        }
                    }
                    // if (objectBody.hasOwnProperty(it)
                    //     && (validationsArray[i].indexOf("type:boolean") !== -1)) {
                    //     if (!objectBody[it] == true || !objectBody[it] == false) {
                    //         errors.push("La propiedad "+ it + " Debe ser Boolean valor enviado "+ objectBody[it])
                    //         break
                    //     }
                    // }
                    if (objectBody.hasOwnProperty(it) &&
                        (objectBody[it] === null || objectBody[it] === 'null' ||
                            objectBody[it] === undefined || objectBody[it] === '')) {
                        if (it !== 'areaCode')
                            errors.push("La propiedad " + it + " es requerida valor enviado " + objectBody[it]);
                        break;
                    }
                    if (objectBody.hasOwnProperty(it)
                        && typeof validationsArray[i] === 'string'
                        && (validationsArray[i].indexOf("enum:") !== -1)) {
                        const options = validationsArray[i].split(":")[1];
                        const arrOptions = options.split(',');
                        const filtered = arrOptions.filter(i => i === objectBody[it].toString());
                        if (filtered.length === 0) {
                            errors.push("la propiedad " + it + " solo permite las siguientes opciones : " + options);
                        }
                    }
                    if (objectBody.hasOwnProperty(it)
                        && typeof validationsArray[i] === 'string'
                        && (validationsArray[i].indexOf("min:") !== -1)) {
                        valueMin = validationsArray[i].split(":")[1];
                        //   console.log(validations[it], valueMin, it, validationsArray[i]);
                        if (objectBody[it].toString().length < valueMin) {
                            // console.log();
                            errors.push("El minimo de caracteres para la propiedad " + it + " es de " + valueMin + ", valor encontrado con " + objectBody[it].toString().length + " caracteres");
                        }
                    }
                    else if (objectBody.hasOwnProperty(it)
                        && typeof validationsArray[i] === 'string'
                        && (validationsArray[i].indexOf("max:") !== -1)) {
                        valueMax = validationsArray[i].split(":")[1];
                        if (objectBody[it].toString().length > valueMax) {
                            errors.push("El maximo de caracteres para la propiedad " + it + " es de " + valueMax + ", valor enviado con " + objectBody[it].toString().length + " caracteres");
                        }
                    }
                    else if (objectBody.hasOwnProperty(it)
                        && typeof validationsArray[i] === 'string'
                        && (validationsArray[i].indexOf("type:") !== -1)) {
                        type = validationsArray[i].split(":")[1];
                        //  console.log(type, objectBody[it], typeof objectBody[it],typeof objectBody[it] !== type);
                        if (typeof objectBody[it] !== type && typeof objectBody[it] !== 'object') {
                            if ((type === "integer" || type === "decimal") && typeof objectBody[it] === 'number') {
                                if (Utils_1.getTypeNumber(objectBody[it]) !== type) {
                                    errors.push("La propiedad " + it + " debe ser de tipo " + type + ", valor enviado de tipo " + objectBody[it]);
                                }
                            }
                            else
                                errors.push("La propiedad " + it + " debe ser de tipo " + type + ", valor enviado de tipo " + objectBody[it]);
                        }
                        if (type === "array" || type.indexOf("=>") !== -1) {
                            if (!Array.isArray(objectBody[it])) {
                                errors.push("La propiedad " + it + " debe ser de tipo " + type + ", valor enviado de tipo " + objectBody[it]);
                            }
                            if (validationsArray[i].indexOf("=>") !== -1) {
                                const validate = Utils_1.validateArrayObjects(validationsArray[i].split("=>")[1], objectBody[it], it);
                                if (validate.length > 0) {
                                    let o = {};
                                    o[it] = validate;
                                    errors.push(o);
                                }
                            }
                        }
                    }
                    else if (validationsArray[i] === "required" && !objectBody.hasOwnProperty(it)) {
                        errors.push("La propiedad " + it + " es requerida.");
                    }
                }
            }
            return {
                fails: errors.length > 0,
                message: errors,
                object: objectValidated
            };
        }
        catch (e) {
            console.log(e);
            throw {
                fails: true,
                message: e.message,
                status: e.code
            };
        }
    }
}
exports.Validator = Validator;
//# sourceMappingURL=Validator.js.map