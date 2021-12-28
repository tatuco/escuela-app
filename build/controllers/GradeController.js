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
const Grade_1 = require("../entity/Grade");
const Validator_1 = require("../core/Validator");
const Course_1 = require("../entity/Course");
class GradeController {
}
exports.GradeController = GradeController;
GradeController.index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const grades = yield Grade_1.Grade.find({
            where: { deleted: false }
        });
        return res.send({
            data: grades
        }).status(200);
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
GradeController.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateStore = {
        courses: "type:array=>{id=integer}",
        name: "type:string"
    };
    try {
        const valide = Validator_1.Validator.make(req, validateStore);
        if (valide.fails) {
            throw { message: valide.message, code: 422 };
        }
        const grade = yield Grade_1.Grade.findOne({
            where: { deleted: false, id: req.params.id }
        });
        if (!grade)
            throw { message: 'Grado no encontrado', status: 404 };
        const data = valide.object;
        if (req.body.hasOwnProperty('courses')) {
            const courses = req.body.courses;
            for (let i = 0; i < courses.length; i++) {
                console.log(i);
                const course = yield Course_1.Course.findOne(courses[i].id);
                if (!course)
                    throw { message: `El curso en la posicion ${i} no existe.`, status: 404 };
            }
            grade.courses = courses;
            yield grade.save();
            delete data.courses;
        }
        yield Grade_1.Grade.update(req.params.id, data);
        yield grade.reload();
        return res.send({
            data: grade
        }).status(201);
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
//# sourceMappingURL=GradeController.js.map