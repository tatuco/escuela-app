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
const Schedule_1 = require("../entity/Schedule");
const ScheduleService_1 = require("../services/ScheduleService");
const Validator_1 = require("../core/Validator");
const Course_1 = require("../entity/Course");
const Grade_1 = require("../entity/Grade");
class ScheduleController {
}
exports.ScheduleController = ScheduleController;
ScheduleController.index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.jwtPayload;
        let dayId = ScheduleService_1.ScheduleService.dayOfWeek();
        if (req.query.day)
            dayId = req.query.day;
        let doWhere = {
            deleted: false,
            gradeId: user.gradeId,
            dayId
        };
        const schedules = yield Schedule_1.Schedule.find({
            relations: ["course"],
            where: doWhere,
            select: ["id", "dayId", "hourId"]
        });
        const addDay = (schedule) => {
            schedule.day = ScheduleService_1.ScheduleService.searchDay(schedule.dayId);
            schedule.hour = ScheduleService_1.ScheduleService.searchHour(schedule.hourId);
            return schedule;
        };
        return res.send({
            data: schedules.map(addDay)
        }).status(200);
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
ScheduleController.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateStore = {
        courseId: "type:integer|min:1",
        gradeId: "type:integer|min:1",
    };
    try {
        let valide = Validator_1.Validator.make(req, validateStore);
        if (valide.fails) {
            throw { message: valide.message, code: 422 };
        }
        if (req.body.hasOwnProperty('courseId')) {
            const course = yield Course_1.Course.findOne(req.body.courseId);
            if (!course) {
                throw { message: `La materia con id ${req.body.courseId} no existe` };
            }
        }
        if (req.body.hasOwnProperty('gradeId')) {
            const grade = yield Grade_1.Grade.findOne(req.body.gradeId);
            if (!grade) {
                throw { message: `La materia con id ${req.body.gradeId} no existe` };
            }
        }
        yield Schedule_1.Schedule.update(req.params.id, valide.object);
        return res.send().status(204);
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
//# sourceMappingURL=ScheduleController.js.map