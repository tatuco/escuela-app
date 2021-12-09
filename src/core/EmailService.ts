import {User} from "../entity/User";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import {handleError} from "./Utils";
import {Request, Response} from "express";
import {SessionControl} from "./SessionControl";

const nodemailer = require("nodemailer");


export class EmailService {
    static async send(req: Request, res: Response) {
      try {
          const email = req.body.email;

        //  let testAccount = await nodemailer.createTestAccount();
          let transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                  user: "bluebuilding53@gmail.com",
                  pass: "bluebuilding123"
              }
          });
          const user = await User.findOne({
              where: {email}
          });
          if (!user)
              throw {
                  message: "Usuario no econtrado.",
                  status: 401
              };

          const token = await jwt.sign(
              {id: user.id, name: user.name, email: user.email},
              config.jwtSecret,
              {expiresIn: "1h"}
          );
          await SessionControl.storeSession(user, token);

          let info = await transporter.sendMail({
              from: 'bluebuilding', // sender address
              to: email, // list of receivers
              subject: "Recuperar Contraseña", // Subject line
              text: `http://localhost:3001/Recovery?token=${token}`, // plain text body
              html: `<b>http://localhost:3001/Recovery?token=${token}</b>` // html body
          });
          /**
           * bluebuilding53
           * bluebuilding123
           */
         /* console.log("Message sent: %s", info.messageId);

          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));*/
          return res.send({
              message: "Correo enviado "+email
          }).status(200);
      } catch (e) {
          return handleError(res, e);
      }
    }
}
