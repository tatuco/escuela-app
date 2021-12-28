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
const Grade_1 = require("../entity/Grade");
class CreateGrades1636823653225 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const grades = [
                { name: "Sexto grado" },
                { name: "Septimo grado" },
                { name: "Octavo grado" },
                { name: "Noveno grado" },
                { name: "Décimo grado" },
                { name: "Once grado" },
            ];
            const repository = typeorm_1.getRepository(Grade_1.Grade);
            yield repository.save(grades);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.CreateGrades1636823653225 = CreateGrades1636823653225;
//# sourceMappingURL=1636823653225-CreateGrades.js.map