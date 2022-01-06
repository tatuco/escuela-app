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
require('dotenv').config();
const Utils_1 = require("../core/Utils");
const File_1 = require("../entity/File");
const Validator_1 = require("../core/Validator");
const UploadFileService_1 = require("../core/UploadFileService");
const typeorm_1 = require("typeorm");
class FileController {
}
exports.FileController = FileController;
FileController.index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let gradeId = res.locals.jwtPayload.gradeId;
        let courseId = null;
        if (req.query.hasOwnProperty('gradeId')) {
            gradeId = req.query.gradeId;
        }
        let doWhere = { deleted: false, gradeId: gradeId };
        if (req.query.hasOwnProperty('courseId')) {
            doWhere.courseId = req.query.courseId;
        }
        const files = yield File_1.File.find({
            relations: ['user', 'course', 'grade'],
            where: doWhere
        });
        return res.send({
            data: files
        }).status(200);
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
FileController.store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateStore = {
        description: "min:5|type:string",
        file: "required|type:string",
        gradeId: "required",
        courseId: "required"
    };
    try {
        const valide = Validator_1.Validator.make(req, validateStore);
        if (valide.fails) {
            throw { message: valide.message, code: 422 };
        }
        const file = yield UploadFileService_1.UploadFileService.uploadFile(req.body.file, 'files');
        if (!file.status)
            throw { message: "Error En la subida Documento", status: 500 };
        valide.object.file = `${process.env.APP_URL}/${file.subDir}${file.file}`;
        valide.object.userId = res.locals.jwtPayload.userId;
        const repository = typeorm_1.getRepository(File_1.File);
        const data = yield repository.save(valide.object);
        return res.status(201).send({
            data
        });
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
FileController.destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const obj = yield File_1.File.findOne(req.params.id);
        if (!obj)
            throw { message: "El documento no existe", status: 404 };
        obj.deleted = true;
        yield obj.save();
        return res.send().status(204);
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
//# sourceMappingURL=FileController.js.map