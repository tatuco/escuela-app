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
const Grade_1 = require("../entity/Grade");
const Course_1 = require("../entity/Course");
class RelationGradeWithCourse1638939307801 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const grades = yield Grade_1.Grade.find({
                where: { deleted: false }
            });
            const courses = yield Course_1.Course.find({
                where: { deleted: false }
            });
            for (const grade of grades) {
                grade.courses = courses.map(course => ({ id: course.id }));
                yield grade.save();
            }
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.RelationGradeWithCourse1638939307801 = RelationGradeWithCourse1638939307801;
//# sourceMappingURL=1638939307801-RelationGradeWithCourse.js.map