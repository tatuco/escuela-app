import {Request, Response} from "express";
import {handleError} from "../core/Utils";
import {Notice} from "../entity/Notice";
import {Validator} from "../core/Validator";
import {UploadFileService} from "../core/UploadFileService";
import {getRepository} from "typeorm";
import {Note} from "../entity/Note";
import {File} from "../entity/File";

export class NoticeController {
    static index = async (req: Request, res: Response) => {
        try {
            const notices = await Notice.find({
                where: {deleted: false}
            })
            return res.send({
                data: notices
            }).status(200);
        } catch (e) {
            return handleError(res, e);
        }
    }

    static store = async (req: Request, res: Response) => {
        const validateStore = {
            description: "min:5|type:string",
            image: "required|type:string"
        };
        try {
            const valide: any = Validator.make(req, validateStore);
            if (valide.fails) {
                throw {message: valide.message, code: 422};
            }
            const image = await UploadFileService.uploadFile(req.body.image, 'images');
            if (!image.status)
                throw {message: "Error En la subida de la imagen", status: 500};

            valide.object.image = `${process.env.APP_URL}/${image.subDir}${image.file}`
            valide.object.userId = res.locals.jwtPayload.userId
            const repository = getRepository(Notice);
            const data = await repository.save(valide.object);
            return res.status(201).send({
                data
            })
        } catch (e) {
            return handleError(res, e);
        }
    };

    static update = async (req: Request, res: Response) => {
        const validateStore = {
            description: "min:5|type:string",
            image: "type:string"
        };
        try {
            const valide: any = Validator.make(req, validateStore);
            if (valide.fails) {
                throw {message: valide.message, code: 422};
            }
            if (req.body.hasOwnProperty('image')) {
                const image = await UploadFileService.uploadFile(req.body.image, 'images');
                if (!image.status)
                    throw {message: "Error En la subida de la imagen", status: 500};

                valide.object.image = `${process.env.APP_URL}/${image.subDir}${image.file}`
            }

            valide.object.userId = res.locals.jwtPayload.userId
            await Note.update(req.params.id, valide.object);
            return res.status(201).send()
        } catch (e) {
            return handleError(res, e);
        }
    };

    static destroy = async (req: Request, res: Response) => {
        try {
            const obj = await Notice.findOne(req.params.id);
            if (!obj)
                throw { message: "La noticia no existe", status: 404 }
            obj.deleted = true;
            await obj.save();
            return res.send().status(204);
        } catch (e) {
            return handleError(res, e);
        }
    };
}