import {Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import {getRepository} from "typeorm";
import {User} from "../entity/User";
import config from "../config/config";
import {handleError} from "../core/Utils";
import {EmailService} from "../core/EmailService";


class AuthController {
    static login = async (req: Request, res: Response) => {
        let {code, password} = req.body;
        if (!(code && password)) {
            return res.send({
                message: "Debe enviar code y password para Iniciar Sesion."
            }).status(400);
        }
        let user: User;
        try {
            user = await User.findOne({
                where: {id: code}
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
                }
            }
            const token = jwt.sign(
                {
                    userId: user.id,
                    email: user.email,
                    role: user.role,
                    gradeId: user.gradeId
                },
                config.jwtSecret,
                {expiresIn: "5d"}
            );
            let data: any = {
                token: token,
                user: user.email,
                id: user.id,
                role: user.role,
                name: user.name,
                phone: user.phone,
            }
            if (user.isTeacher()) {
                data.grades = user.grades;
                data.coures = user.courses;
            } else if (user.isStudent()) {
                data.gradeId = user.gradeId;
            }
            return res.send(data).status(200);

        } catch (e) {
            return handleError(res, e);
        }
    };

    static logout = async (req: Request, res: Response) => {
        try {

            let jwtPayload = res.locals.jwtPayload;
            const token = <string>req.headers.authorization.replace("Bearer ", "");
            return res.send({
                message: "Session Destruida"
            }).status(200);
        } catch (e) {
            return handleError(res, e);
        }
    };

    static changePassword = async (req: Request, res: Response) => {
        const id = res.locals.jwtPayload.id;

        //Get parameters from the body
        const {newPassword} = req.body;
        if (!(newPassword)) {
            return res.status(400).send();
        }

        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (e) {
            return res.status(401).send();
        }
        user.password = newPassword;
        user.hashPassword();
        await userRepository.save(user);

        return res.send({
            message: "Contraseña Actualizada"
        }).status(200);
    };

    static async verify(token) {
        try {
            //   const b = await jwtr.destroy(token);
            //   console.log(b);
            //  return await jwtr.verify(token, config.jwtSecret);
            //   console.log(a);
            //  return a;
        } catch (e) {
            console.log(e);
            throw {message: "Datos Incorrectos", status: 401};
        }

    }

    static async generateToken(user) {

        const token = jwt.sign(
            {userId: user.id, email: user.email, role: user.role},
            config.jwtSecret
        );

        return token;
    }

    static send = async (req: Request, res: Response) => {
        try {
            const resp = await EmailService.send(req, res);
            return resp;
        } catch (e) {
            return handleError(res, e);
        }
    };
}

export default AuthController;

