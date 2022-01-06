import {Param} from "../entity/Param";

require('dotenv').config();
import {Request, Response} from "express";
import {handleError} from "../core/Utils";
import {File} from "../entity/File";
import {Validator} from "../core/Validator";
import {UploadFileService} from "../core/UploadFileService";
import {getRepository} from "typeorm";

export class FileController {
    static index = async (req: Request, res: Response) => {
        try {
            let gradeId = res.locals.jwtPayload.gradeId;
            let courseId = null;
            if (req.query.hasOwnProperty('gradeId')) {
                gradeId = req.query.gradeId
            }
            let doWhere : any = { deleted: false, gradeId: gradeId }
            if (req.query.hasOwnProperty('courseId')) {
                doWhere.courseId = req.query.courseId
            }
            const files = await File.find({
                relations: ['user', 'course', 'grade'],
                where: doWhere
            })
            return res.send({
                data: files
            }).status(200);
        } catch (e) {
            return handleError(res, e);
        }
    }

    static store = async (req: Request, res: Response) => {
        const validateStore = {
            description: "min:5|type:string",
            file: "required|type:string",
            gradeId: "required",
            courseId: "required"
        };
        try {
            const valide: any = Validator.make(req, validateStore);
            if (valide.fails) {
                throw {message: valide.message, code: 422};
            }
            const file = await UploadFileService.uploadFile(req.body.file, 'files');
            if (!file.status)
                throw {message: "Error En la subida Documento", status: 500};

            valide.object.file = `${process.env.APP_URL}/public/${file.subDir}${file.file}`
            valide.object.userId = res.locals.jwtPayload.userId
            const repository = getRepository(File);
            const data = await repository.save(valide.object);
            return res.status(201).send({
                data
            })
        } catch (e) {
            return handleError(res, e);
        }
    };

    static destroy = async (req: Request, res: Response) => {
        try {
            const obj = await File.findOne(req.params.id);
            if (!obj)
                throw { message: "El documento no existe", status: 404 }
            obj.deleted = true;
            await obj.save();
            return res.send().status(204);
        } catch (e) {
            return handleError(res, e);
        }
    };
}