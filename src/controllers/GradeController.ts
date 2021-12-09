import {Request, Response} from "express";
import {handleError} from "../core/Utils";
import {Grade} from "../entity/Grade";
import {Validator} from "../core/Validator";
import {User} from "../entity/User";
import {Course} from "../entity/Course";

export class GradeController {
    static index = async (req: Request, res: Response) => {
        try {
            const grades = await Grade.find({
                where: { deleted: false}
            })
            return res.send({
                data: grades
            }).status(200);
        } catch (e) {
            return handleError(res, e);
        }
    }

    static update = async (req: Request, res: Response) => {
        const validateStore = {
            courses: "type:array=>{id=integer}",
            name: "type:string"
        };
        try {
            const valide: any = Validator.make(req, validateStore);
            if (valide.fails) {
                throw {message: valide.message, code: 422};
            }
            const grade = await Grade.findOne({
                where: { deleted: false, id: req.params.id}
            })
            if (!grade)
                throw {message: 'Grado no encontrado', status: 404}

            const data: any = valide.object;
            if (req.body.hasOwnProperty('courses')) {
                const courses = req.body.courses;
                for (let i = 0; i < courses.length; i++) {
                    console.log(i)
                    const course = await Course.findOne(courses[i].id)
                    if (!course)
                        throw {message: `El curso en la posicion ${i} no existe.`, status: 404}
                }
                grade.courses = courses;
                await grade.save();
                delete data.courses;
            }
            await Grade.update(req.params.id, data);
            await grade.reload();
            return res.send({
                data: grade
            }).status(201);
        } catch (e) {
            return handleError(res, e);
        }
    }
}