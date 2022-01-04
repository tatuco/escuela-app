import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import {Roles, User} from "../entity/User";
import {SessionControl} from "../core/SessionControl";

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
  next();
  let token = req.headers['authorization'] ?? 'Bearer ' + req.query.token;
  if (!token) {
    return res.status(401).send({
      message: "Es necesario el token de autenticación"
    });
    return
  }
    token = token.replace("Bearer ", "");
    let jwtPayload;

  try {
    jwtPayload = jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    return res.status(401).send({
      status: false,
      message: "Access Unauthorized",
      exception: error
    });
  }
  next();
};
