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
const jwt = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const config_1 = require("../config/config");
const Utils_1 = require("../core/Utils");
const EmailService_1 = require("../core/EmailService");
class AuthController {
    static verify(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //   const b = await jwtr.destroy(token);
                //   console.log(b);
                //  return await jwtr.verify(token, config.jwtSecret);
                //   console.log(a);
                //  return a;
            }
            catch (e) {
                console.log(e);
                throw { message: "Datos Incorrectos", status: 401 };
            }
        });
    }
    static generateToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, config_1.default.jwtSecret);
            return token;
        });
    }
}
AuthController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { code, password } = req.body;
    if (!(code && password)) {
        return res.send({
            message: "Debe enviar code y password para Iniciar Sesion."
        }).status(400);
    }
    let user;
    try {
        user = yield User_1.User.findOne({
            where: { id: code }
        });
        if (!user)
            throw {
                message: "Usuario no econtrado.",
                status: 401
            };
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            throw {
                message: "Password Incorrecta.",
                status: 401
            };
        }
        const token = jwt.sign({
            userId: user.id,
            email: user.email,
            role: user.role,
            gradeId: user.gradeId
        }, config_1.default.jwtSecret, { expiresIn: "5d" });
        let data = {
            token: token,
            user: user.email,
            id: user.id,
            role: user.role,
            name: user.name,
            phone: user.phone,
        };
        if (user.isTeacher()) {
            data.grades = user.grades;
            data.coures = user.courses;
        }
        else if (user.isStudent()) {
            data.gradeId = user.gradeId;
        }
        return res.send(data).status(200);
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
AuthController.logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let jwtPayload = res.locals.jwtPayload;
        const token = req.headers.authorization.replace("Bearer ", "");
        return res.send({
            message: "Session Destruida"
        }).status(200);
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
AuthController.changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = res.locals.jwtPayload.id;
    //Get parameters from the body
    const { newPassword } = req.body;
    if (!(newPassword)) {
        return res.status(400).send();
    }
    const userRepository = typeorm_1.getRepository(User_1.User);
    let user;
    try {
        user = yield userRepository.findOneOrFail(id);
    }
    catch (e) {
        return res.status(401).send();
    }
    user.password = newPassword;
    user.hashPassword();
    yield userRepository.save(user);
    return res.send({
        message: "Contraseña Actualizada"
    }).status(200);
});
AuthController.send = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield EmailService_1.EmailService.send(req, res);
        return resp;
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map