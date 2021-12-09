import { Request, Response, NextFunction } from "express";

export const checkRole = (roles) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const role = res.locals.jwtPayload.role;
        if (roles.filter(i => i === role).length > 0) next();
        else return res.status(401).send({
            message: "No Autorizado! para acceder a este recurso require rol " + roles
        });
    };
};