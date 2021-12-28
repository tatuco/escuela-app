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
const Course_1 = require("../entity/Course");
const Validator_1 = require("../core/Validator");
const typeorm_1 = require("typeorm");
class CourseController {
}
exports.CourseController = CourseController;
CourseController.index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let gradeId = res.locals.jwtPayload.gradeId;
        if (req.query.hasOwnProperty('gradeId')) {
            gradeId = req.query.gradeId;
        }
        const courses = yield Course_1.Course.find({
            relations: ['grades'],
            where: (qb) => {
                qb.where('Course.deleted = :deleted', { deleted: false });
                if (gradeId) {
                    qb.andWhere('Course__grades_Course__grades_courses.gradeId = :gradeId', { gradeId: gradeId });
                }
            }
        });
        return res.send({
            data: courses.map((course) => {
                delete course.grades;
                return course;
            })
        }).status(200);
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
CourseController.store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateStore = {
        name: "required|type:string|min:1",
    };
    try {
        const valide = Validator_1.Validator.make(req, validateStore);
        if (valide.fails) {
            throw { message: valide.message, code: 422 };
        }
        const repository = typeorm_1.getRepository(Course_1.Course);
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
CourseController.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateStore = {
        name: "type:string|min:1",
    };
    try {
        let valide = Validator_1.Validator.make(req, validateStore);
        if (valide.fails) {
            throw { message: valide.message, code: 422 };
        }
        console.log(valide.object);
        yield Course_1.Course.update(req.params.id, valide.object);
        return res.send().status(204);
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
//# sourceMappingURL=CourseController.js.map