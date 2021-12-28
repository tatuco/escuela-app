"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const User_1 = require("../entity/User");
const BaseController_1 = require("../core/BaseController");
const UserService_1 = require("../services/UserService");
const Validator_1 = require("../core/Validator");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Utils_1 = require("../core/Utils");
const Course_1 = require("../entity/Course");
const Grade_1 = require("../entity/Grade");
let UserController = class UserController extends BaseController_1.BaseController {
    constructor(userRepository) {
        super(UserService_1.default);
        this.userRepository = userRepository;
    }
};
UserController.index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = typeorm_1.getRepository(User_1.User);
        let doWhere = { deleted: false };
        let users = yield userRepository.find({
            where: doWhere,
        });
        return res.send({
            data: users
        }).status(200);
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
UserController.get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const userRepository = typeorm_1.getRepository(User_1.User);
    try {
        const user = yield userRepository.findOneOrFail(id);
        return res.send({
            data: user
        }).status(200);
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
UserController.store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateStore = {
        id: "required|min:1|type:string",
        password: "required|min:5|type:string",
        email: "required|min:5|type:string",
        name: "required|min:4|type:string",
        lastName: "required|min:5|type:string",
        phone: "required|min:5|type:string",
        role: "required|type:string|enum:" + `${User_1.Roles.TEACHER},${User_1.Roles.STUDENT}`,
    };
    try {
        const valide = Validator_1.Validator.make(req, validateStore);
        if (valide.fails) {
            throw { message: valide.message, code: 422 };
        }
        let { email, password, name, phone, role, lastName, id } = req.body;
        const u = yield User_1.User.findOne({ where: [{ email }, { id }] });
        if (u) {
            if (u.email === email)
                throw { message: "Ya existe una cuenta con este correo", status: 422 };
            else
                throw { message: "Ya existe una cuenta con este codigo", status: 422 };
        }
        let user = new User_1.User();
        user.id = id;
        user.password = password;
        user.role = role;
        user.email = email;
        user.name = name;
        user.lastName = lastName;
        user.phone = phone;
        user.hashPassword();
        const userRepository = typeorm_1.getRepository(User_1.User);
        yield userRepository.save(user);
        return res.send({
            status: true,
            message: "Usuario Creado",
            data: user
        }).status(201);
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
UserController.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const validateStore = {
            email: "min:5|type:string",
            name: "min:5|type:string",
            lastName: "min:5|type:string",
            phone: "min:5|type:string",
            role: "type:string|enum:" + `${User_1.Roles.ADMIN},${User_1.Roles.TEACHER},${User_1.Roles.STUDENT}`,
            gradeId: "type:integer",
            grades: "type:array=>{id=integer}",
            courses: "type:array=>{id=integer}",
        };
        const valide = Validator_1.Validator.make(req, validateStore);
        if (valide.fails) {
            throw { message: valide.message, status: 422 };
        }
        const user = yield User_1.User.findOneOrFail(id);
        if (!user)
            throw { status: 404, message: "El usuario no existe." };
        const data = valide.object;
        if (user.isTeacher() && req.body.hasOwnProperty('grades')) {
            const grades = req.body.grades;
            for (let i = 0; i < grades.length; i++) {
                const grade = yield Grade_1.Grade.findOne(grades[i].id);
                if (!grade)
                    throw { message: `El grado en la posicion ${i} no existe.`, status: 404 };
            }
            user.grades = grades;
            yield user.save();
            delete data.gradeId;
            delete data.grades;
        }
        if (user.isTeacher() && req.body.hasOwnProperty('courses')) {
            const courses = req.body.courses;
            for (let i = 0; i < courses.length; i++) {
                const course = yield Course_1.Course.findOne(courses[i].id);
                if (!course)
                    throw { message: `El curso en la posicion ${i} no existe.`, status: 404 };
            }
            user.courses = courses;
            yield user.save();
            delete data.courses;
        }
        yield User_1.User.update({ id: req.params.id }, data);
        return res.status(204).send();
    }
    catch (e) {
        return Utils_1.handleError(res, e);
    }
});
UserController.destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const userRepository = typeorm_1.getRepository(User_1.User);
    let user;
    try {
        user = yield userRepository.findOne(id);
        user.deleted = true;
        yield user.save();
        return res.status(204).send();
    }
    catch (error) {
        return Utils_1.handleError(res, error);
    }
});
UserController = __decorate([
    __param(0, typeorm_typedi_extensions_1.InjectRepository(User_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserController);
;
exports.default = UserController;
//# sourceMappingURL=UserController.js.map