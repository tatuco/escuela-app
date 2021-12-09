import {Request, Response} from "express";
import {handleError} from "../core/Utils";
import {Course} from "../entity/Course";
import {Validator} from "../core/Validator";
import {getRepository} from "typeorm";

export class CourseController {
    static index = async (req: Request, res: Response) => {
        try {
            let gradeId = res.locals.jwtPayload.gradeId;
            if (req.query.hasOwnProperty('gradeId')) {
                gradeId = req.query.gradeId
            }
            const courses = await Course.find({
                relations: ['grades'],
                where: (qb) => {
                    qb.where('Course.deleted = :deleted', {deleted: false})
                    if (gradeId) {
                        qb.andWhere('Course__grades_Course__grades_courses.gradeId = :gradeId', {gradeId: gradeId})
                    }
                }
            })
            return res.send({
                data: courses.map((course) => {
                    delete course.grades;
                    return course;
                })
            }).status(200);
        } catch (e) {
            return handleError(res, e);
        }
    }

    static store = async (req: Request, res: Response) => {
        const validateStore = {
            name: "required|type:string|min:1",
        };
        try {
            const valide = Validator.make(req, validateStore);
            if (valide.fails) {
                throw {message: valide.message, code: 422};
            }
            const repository = getRepository(Course);
            const param = repository.create(valide.object);
            const data = await repository.save(param);
            return res.status(201).send({
                data
            })
        } catch (e) {
            return handleError(res, e);
        }
    };

    static update = async (req: Request, res: Response) => {
        const validateStore = {
            name:  "type:string|min:1",
        };
        try {
            let valide = Validator.make(req, validateStore);
            if (valide.fails) {
                throw {message: valide.message, code: 422};
            }
            console.log(valide.object)
            await Course.update(req.params.id, valide.object);
            return res.send().status(204);
        } catch (e) {
            return handleError(res, e);
        }
    };
}