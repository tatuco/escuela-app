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
const Schedule_1 = require("../entity/Schedule");
class CreateSchedule1636829200300 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            let items = [];
            for (let grade = 1; grade <= 6; grade++) {
                for (let day = 1; day <= 5; day++) {
                    for (let hour = 1; hour <= 8; hour++) {
                        let course = 1;
                        if (hour === 3 || hour === 8)
                            course = 2;
                        if (hour === 4 || hour === 5)
                            course = 3;
                        if (hour === 6 || hour === 7)
                            course = 4;
                        const item = {
                            gradeId: grade,
                            dayId: day,
                            hourId: hour,
                            courseId: course,
                            userId: '000000000',
                        };
                        items.push(item);
                    }
                }
            }
            const repository = typeorm_1.getRepository(Schedule_1.Schedule);
            yield repository.save(items);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.CreateSchedule1636829200300 = CreateSchedule1636829200300;
//# sourceMappingURL=1636829200300-CreateSchedule.js.map