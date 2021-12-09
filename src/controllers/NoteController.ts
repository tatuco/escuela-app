import {Request, Response} from "express";
import {handleError} from "../core/Utils";
import { Note } from "../entity/Note";
import {Validator} from "../core/Validator";
import {getRepository} from "typeorm";

export class NoteController {
    static index = async (req: Request, res: Response) => {
        try {
            const user = res.locals.jwtPayload;
            const notes = await Note.find({
                where: { deleted: false, userId: user.userId}
            })
            return res.send({
                data: notes
            }).status(200);
        } catch (e) {
            return handleError(res, e);
        }
    }

    static update = async (req: Request, res: Response) => {
        const user = res.locals.jwtPayload;
        const validateStore = {
            title: "type:string|min:1",
            description:  "type:string|min:1",
            reminder: "type:string",
        };
        try {
            let valide = Validator.make(req, validateStore);
            if (valide.fails) {
                throw {message: valide.message, code: 422};
            }
            valide.object.userId = user.userId;
            await Note.update(req.params.id, valide.object);
            return res.send().status(204);
        } catch (e) {
            return handleError(res, e);
        }
    };

    static store = async (req: Request, res: Response) => {
        const user = res.locals.jwtPayload;
        const validateStore = {
            title: "required|type:string|min:1",
            description:  "required|type:string|min:1",
            reminder: "required|type:string",
        };
        try {
            const valide = Validator.make(req, validateStore);
            if (valide.fails) {
                throw {message: valide.message, code: 422};
            }
            valide.object['userId'] = user.userId;
            const repository = getRepository(Note);
            const param = repository.create(valide.object);
            const data = await repository.save(param);
            return res.status(201).send({
                data
            })
        } catch (e) {
            return handleError(res, e);
        }
    };
}