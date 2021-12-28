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
const Utils_1 = require("../core/Utils");
const Notice_1 = require("../entity/Notice");
const Validator_1 = require("../core/Validator");
const UploadFileService_1 = require("../core/UploadFileService");
const typeorm_1 = require("typeorm");
const Note_1 = require("../entity/Note");
class NoticeController {
}
exports.NoticeController = NoticeController;
NoticeController.index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notices = yield Notice_1.Notice.find({
            where: { deleted: false }
        });
        return res.send({
            data: notices
        }).status(200);
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
NoticeController.store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateStore = {
        description: "min:5|type:string",
        image: "required|type:string"
    };
    try {
        const valide = Validator_1.Validator.make(req, validateStore);
        if (valide.fails) {
            throw { message: valide.message, code: 422 };
        }
        const image = yield UploadFileService_1.UploadFileService.uploadFile(req.body.image, 'images');
        if (!image.status)
            throw { message: "Error En la subida de la imagen", status: 500 };
        valide.object.image = `${process.env.APP_URL}/${image.subDir}${image.file}`;
        valide.object.userId = res.locals.jwtPayload.userId;
        const repository = typeorm_1.getRepository(Notice_1.Notice);
        const data = yield repository.save(valide.object);
        return res.status(201).send({
            data
        });
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
NoticeController.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateStore = {
        description: "min:5|type:string",
        image: "type:string"
    };
    try {
        const valide = Validator_1.Validator.make(req, validateStore);
        if (valide.fails) {
            throw { message: valide.message, code: 422 };
        }
        if (req.body.hasOwnProperty('image')) {
            const image = yield UploadFileService_1.UploadFileService.uploadFile(req.body.image, 'images');
            if (!image.status)
                throw { message: "Error En la subida de la imagen", status: 500 };
            valide.object.image = `${process.env.APP_URL}/${image.subDir}${image.file}`;
        }
        valide.object.userId = res.locals.jwtPayload.userId;
        yield Note_1.Note.update(req.params.id, valide.object);
        return res.status(201).send();
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
//# sourceMappingURL=NoticeController.js.map