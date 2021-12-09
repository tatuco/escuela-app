import {NextFunction, Request, Response} from "express";
import {Roles} from "../entity/User";

export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
    const role = res.locals.jwtPayload.role;
    if ([Roles.ADMIN].filter(i => i === role).length > 0) next();
    if (req.params.id === res.locals.jwtPayload.userId) next();
    else return res.status(401).send({
        message: "No Autorizado! para acceder a este recurso requires rol Admin o Ser el usuario"
    });
};