import {Request, Response} from "express";
import {handleError} from "../core/Utils";
import {getRepository} from "typeorm";
import {Validator} from "../core/Validator";
import {Param} from "../entity/Param";
class ParamController {
    static index = async (req: Request, res: Response) => {
        try {
            const list = await Param.find({
                where: {deleted: false}
            });
            return res.send({
                data: list
            }).status(200);
        } catch (e) {
            return handleError(res, e);
        }
    }

    static store = async (req: Request, res: Response) => {
        const validateStore = {
            key: "required|min:4|type:string",
            value: "required|type:string|min:1",
            description: "required|type:string|min:5"
        };
        try {
            const valide = Validator.make(req, validateStore);
            if (valide.fails) {
                throw {message: valide.message, code: 422};
            }

            const p = await Param.findOne(req.body.key.toUpperCase())
            if (p) {
                throw {message: `Ya existe un parametro con la llave ${req.body.key.toUpperCase()}`, status: 422}
            }
            const repository = getRepository(Param);
            const param = await repository.create({
                key: req.body.key.toUpperCase(),
                value: req.body.value,
                description: req.body.description
            });
            const data = await repository.save(param);
            return res.status(201).send({
                data
            })
        } catch (e) {
            return handleError(res, e);
        }
    };

    static update = async (req: Request, res: Response) => {
        const validateStore = {
            value: "required|type:string|min:1",
        };
        try {
            const valide = Validator.make(req, validateStore);
            if (valide.fails) {
                throw {message: valide.message, code: 422};
            }
            await Param.update({key: req.params.id}, valide.object);
            return res.send().status(204);
        } catch (e) {
            return handleError(res, e);
        }
    };

    static destroy = async (req: Request, res: Response) => {
        try {
            const obj = await Param.findOne(req.params.id);
            if (!obj)
                throw {message: "El Parametro no existe", status: 404}
            obj.deleted = true;
            await obj.save();
            return res.send().status(204);
        } catch (e) {
            return handleError(res, e);
        }
    };
};


export default ParamController;
