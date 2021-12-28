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
const User_1 = require("../entity/User");
const jwt = require("jsonwebtoken");
const config_1 = require("../config/config");
const Utils_1 = require("./Utils");
const SessionControl_1 = require("./SessionControl");
const nodemailer = require("nodemailer");
class EmailService {
    static send(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                //  let testAccount = await nodemailer.createTestAccount();
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    auth: {
                        user: "bluebuilding53@gmail.com",
                        pass: "bluebuilding123"
                    }
                });
                const user = yield User_1.User.findOne({
                    where: { email }
                });
                if (!user)
                    throw {
                        message: "Usuario no econtrado.",
                        status: 401
                    };
                const token = yield jwt.sign({ id: user.id, name: user.name, email: user.email }, config_1.default.jwtSecret, { expiresIn: "1h" });
                yield SessionControl_1.SessionControl.storeSession(user, token);
                let info = yield transporter.sendMail({
                    from: 'bluebuilding',
                    to: email,
                    subject: "Recuperar Contraseña",
                    text: `http://localhost:3001/Recovery?token=${token}`,
                    html: `<b>http://localhost:3001/Recovery?token=${token}</b>` // html body
                });
                /**
                 * bluebuilding53
                 * bluebuilding123
                 */
                /* console.log("Message sent: %s", info.messageId);
       
                 console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));*/
                return res.send({
                    message: "Correo enviado " + email
                }).status(200);
            }
            catch (e) {
                return Utils_1.handleError(res, e);
            }
        });
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=EmailService.js.map