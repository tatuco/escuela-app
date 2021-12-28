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
const Note_1 = require("../entity/Note");
const Validator_1 = require("../core/Validator");
const typeorm_1 = require("typeorm");
class NoteController {
}
exports.NoteController = NoteController;
NoteController.index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.jwtPayload;
        const notes = yield Note_1.Note.find({
            where: { deleted: false, userId: user.userId }
        });
        return res.send({
            data: notes
        }).status(200);
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
NoteController.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.jwtPayload;
    const validateStore = {
        title: "type:string|min:1",
        description: "type:string|min:1",
        reminder: "type:string",
    };
    try {
        let valide = Validator_1.Validator.make(req, validateStore);
        if (valide.fails) {
            throw { message: valide.message, code: 422 };
        }
        valide.object.userId = user.userId;
        yield Note_1.Note.update(req.params.id, valide.object);
        return res.send().status(204);
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
NoteController.store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.jwtPayload;
    const validateStore = {
        title: "required|type:string|min:1",
        description: "required|type:string|min:1",
        reminder: "required|type:string",
    };
    try {
        const valide = Validator_1.Validator.make(req, validateStore);
        if (valide.fails) {
            throw { message: valide.message, code: 422 };
        }
        valide.object['userId'] = user.userId;
        const repository = typeorm_1.getRepository(Note_1.Note);
        const param = repository.create(valide.object);
        const data = yield repository.save(param);
        return res.status(201).send({
            data
        });
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
//# sourceMappingURL=NoteController.js.map