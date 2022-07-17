import {Request, Response} from "express";
import {handleError} from "../core/Utils";
import {Schedule} from "../entity/Schedule";
import {ScheduleService} from "../services/ScheduleService";
import {Validator} from "../core/Validator";
import {Menu} from "../entity/Menu";
import {Course} from "../entity/Course";
import {Grade} from "../entity/Grade";
import {Roles} from "../entity/User";

export class ScheduleController {
    static index = async (req: Request, res: Response) => {
        try {
            const user = res.locals.jwtPayload;
            let dayId = ScheduleService.dayOfWeek()
            if (req.query.day)
                dayId = req.query.day
            let doWhere: any = {
                deleted: false,
                gradeId: user.gradeId,
                dayId
            };
            if (!user.role.startsWith(Roles.STUDENT) && req.query.hasOwnProperty('gradeId'))
                doWhere.gradeId = req.query.gradeId

            const schedules = await Schedule.find({
                relations: ["course"],
                where: doWhere,
                select: ["id", "dayId", "hourId"]
            })
            const addDay = (schedule) => {
                schedule.day = ScheduleService.searchDay(schedule.dayId)
                schedule.hour = ScheduleService.searchHour(schedule.hourId)
                return schedule
            }
            return res.send({
                data: schedules.map(addDay)
            }).status(200);
        } catch (e) {
            return handleError(res, e);
        }
    }

    static update = async (req: Request, res: Response) => {
        const validateStore = {
            courseId: "type:integer|min:1",
            gradeId:  "type:integer|min:1",
        };
        try {
            let valide = Validator.make(req, validateStore);
            if (valide.fails) {
                throw {message: valide.message, code: 422};
            }
            if (req.body.hasOwnProperty('courseId')) {
                const course = await Course.findOne(req.body.courseId);
                if (!course) {
                    throw {message: `La materia con id ${req.body.courseId} no existe`}
                }
            }
            if (req.body.hasOwnProperty('gradeId')) {
                const grade = await Grade.findOne(req.body.gradeId);
                if (!grade) {
                    throw {message: `La materia con id ${req.body.gradeId} no existe`}
                }
            }
            await Schedule.update(req.params.id, valide.object);
            return res.send().status(204);
        } catch (e) {
            return handleError(res, e);
        }
    }
}