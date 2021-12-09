import {Request, Response} from "express";
import {getRepository, Repository} from "typeorm";
import {Roles, User} from "../entity/User";
import {BaseController} from "../core/BaseController";
import UserService from "../services/UserService";
import {Validator} from "../core/Validator";
import {InjectRepository} from "typeorm-typedi-extensions";
import {handleError} from "../core/Utils";
import {Course} from "../entity/Course";
import {Grade} from "../entity/Grade";

class UserController extends BaseController {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
        super(UserService);
    }

    static index = async (req: Request, res: Response) => {
        try {
            const userRepository = getRepository(User);
            let doWhere: any = {deleted: false};
            let users = await userRepository.find({
                where: doWhere,
            });
            return res.send({
                data: users
            }).status(200);
        } catch (e) {
            return handleError(res, e);
        }
    };

    static get = async (req: Request, res: Response) => {
        const id: any = req.params.id;
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOneOrFail(id);
            return res.send({
                data: user
            }).status(200);
        } catch (e) {
            return handleError(res, e);
        }
    };

    static store = async (req: Request, res: Response) => {
        const validateStore = {
            id: "required|min:1|type:string",
            password: "required|min:5|type:string",
            email: "required|min:5|type:string",
            name: "required|min:4|type:string",
            lastName: "required|min:5|type:string",
            phone: "required|min:5|type:string",
            role: "required|type:string|enum:" + `${Roles.TEACHER},${Roles.STUDENT}`,
        };
        try {
            const valide = Validator.make(req, validateStore);
            if (valide.fails) {
                throw {message: valide.message, code: 422};
            }
            let { email, password, name, phone, role, lastName, id } = req.body;

            const u = await User.findOne({where: [{email}, {id}]});
            if (u) {
                if (u.email === email)
                    throw {message: "Ya existe una cuenta con este correo", status: 422}
                else
                    throw {message: "Ya existe una cuenta con este codigo", status: 422}
            }

            let user = new User();
            user.id = id;
            user.password = password;
            user.role = role;
            user.email = email;
            user.name = name;
            user.lastName = lastName;
            user.phone = phone;
            user.hashPassword();
            const userRepository = getRepository(User);
            await userRepository.save(user);

            return res.send({
                status: true,
                message: "Usuario Creado",
                data: user
            }).status(201);
        } catch (e) {
            return handleError(res, e);
        }
    };

    static update = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const validateStore = {
                email: "min:5|type:string",
                name: "min:5|type:string",
                lastName: "min:5|type:string",
                phone: "min:5|type:string",
                role: "type:string|enum:" + `${Roles.ADMIN},${Roles.TEACHER},${Roles.STUDENT}`,
                gradeId: "type:integer",
                grades: "type:array=>{id=integer}",
                courses: "type:array=>{id=integer}",
            };
            const valide = Validator.make(req, validateStore);
            if (valide.fails) {
                throw {message: valide.message, status: 422};
            }
            const user = await User.findOneOrFail(id);
            if (!user)
                throw {status: 404, message: "El usuario no existe."};
            const data: any = valide.object;
            if (user.isTeacher() && req.body.hasOwnProperty('grades')) {
                const grades = req.body.grades;
                for (let i = 0; i < grades.length; i++) {
                    const grade = await Grade.findOne(grades[i].id)
                    if (!grade)
                        throw {message: `El grado en la posicion ${i} no existe.`, status: 404}
                }
                user.grades = grades;
                await user.save();
                delete data.gradeId;
                delete data.grades;
            }
            if (user.isTeacher() && req.body.hasOwnProperty('courses')) {
                const courses = req.body.courses;
                for (let i = 0; i < courses.length; i++) {
                    const course = await Course.findOne(courses[i].id)
                    if (!course)
                        throw {message: `El curso en la posicion ${i} no existe.`, status: 404}
                }
                user.courses = courses;
                await user.save();
                delete data.courses;
            }

            await User.update({ id: req.params.id }, data);
            return res.status(204).send();
        } catch (e) {
            return handleError(res, e);
        }
    };

    static destroy = async (req: Request, res: Response) => {
        const id = req.params.id;
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOne(id);
            user.deleted = true;
            await user.save();
            return res.status(204).send();
        } catch (error) {
            return handleError(res, error);
        }
    };
};

export default UserController;
