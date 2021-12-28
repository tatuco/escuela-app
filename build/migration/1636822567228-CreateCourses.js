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
const typeorm_1 = require("typeorm");
const Course_1 = require("../entity/Course");
class CreateCourses1636822567228 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = [
                { name: "Matematicas" },
                { name: "Ingles" },
                { name: "Religión" },
                { name: "Naturales" },
            ];
            const repository = typeorm_1.getRepository(Course_1.Course);
            yield repository.save(courses);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.CreateCourses1636822567228 = CreateCourses1636822567228;
//# sourceMappingURL=1636822567228-CreateCourses.js.map