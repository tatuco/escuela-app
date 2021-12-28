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
const typeorm_1 = require("typeorm");
const Validator_1 = require("../core/Validator");
const Param_1 = require("../entity/Param");
class ParamController {
}
ParamController.index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield Param_1.Param.find({
            where: { deleted: false }
        });
        return res.send({
            data: list
        }).status(200);
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
ParamController.store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateStore = {
        key: "required|min:4|type:string",
        value: "required|type:string|min:1",
        description: "required|type:string|min:5"
    };
    try {
        const valide = Validator_1.Validator.make(req, validateStore);
        if (valide.fails) {
            throw { message: valide.message, code: 422 };
        }
        const p = yield Param_1.Param.findOne(req.body.key.toUpperCase());
        if (p) {
            throw { message: `Ya existe un parametro con la llave ${req.body.key.toUpperCase()}`, status: 422 };
        }
        const repository = typeorm_1.getRepository(Param_1.Param);
        const param = yield repository.create({
            key: req.body.key.toUpperCase(),
            value: req.body.value,
            description: req.body.description
        });
        const data = yield repository.save(param);
        return res.status(201).send({
            data
        });
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
ParamController.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateStore = {
        value: "required|type:string|min:1",
    };
    try {
        const valide = Validator_1.Validator.make(req, validateStore);
        if (valide.fails) {
            throw { message: valide.message, code: 422 };
        }
        yield Param_1.Param.update({ key: req.params.id }, valide.object);
        return res.send().status(204);
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
ParamController.destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const obj = yield Param_1.Param.findOne(req.params.id);
        if (!obj)
            throw { message: "El Parametro no existe", status: 404 };
        obj.deleted = true;
        yield obj.save();
        return res.send().status(204);
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
;
exports.default = ParamController;
//# sourceMappingURL=ParamController.js.map