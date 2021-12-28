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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const bcrypt = require("bcryptjs");
const Schedule_1 = require("./Schedule");
const Note_1 = require("./Note");
const Notice_1 = require("./Notice");
const Grade_1 = require("./Grade");
const Course_1 = require("./Course");
const History_1 = require("./History");
var Roles;
(function (Roles) {
    Roles["TEACHER"] = "PROFESOR";
    Roles["STUDENT"] = "ESTUDIANTE";
    Roles["ADMIN"] = "ADMINISTRADOR";
})(Roles = exports.Roles || (exports.Roles = {}));
let User = class User extends typeorm_1.BaseEntity {
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    isTeacher() {
        return this.role === Roles.TEACHER;
    }
    isStudent() {
        return this.role === Roles.STUDENT;
    }
    checkIfUnencryptedPasswordIsValid(unencryptedPassword) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
};
__decorate([
    typeorm_1.Column(),
    typeorm_1.PrimaryColumn(),
    class_validator_1.Length(1, 25),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.Length(6, 100),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_validator_1.Length(1, 20),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "deleted", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: "text" }),
    class_validator_1.Length(1, 255),
    __metadata("design:type", String)
], User.prototype, "token", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: Roles,
        default: Roles.STUDENT
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    typeorm_1.OneToMany(type => Schedule_1.Schedule, schedule => schedule.user),
    __metadata("design:type", Array)
], User.prototype, "schedules", void 0);
__decorate([
    typeorm_1.OneToMany(type => Note_1.Note, note => note.user),
    __metadata("design:type", Array)
], User.prototype, "notes", void 0);
__decorate([
    typeorm_1.OneToMany(type => Notice_1.Notice, notice => notice.user),
    __metadata("design:type", Array)
], User.prototype, "notices", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "gradeId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Grade_1.Grade, grade => grade.users),
    typeorm_1.JoinColumn({ name: "gradeId" }),
    __metadata("design:type", Grade_1.Grade)
], User.prototype, "grade", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Grade_1.Grade, (g) => g.teachers, { eager: true, cascade: true }),
    typeorm_1.JoinTable({
        name: 'user_grade',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'gradeId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], User.prototype, "grades", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Course_1.Course, (c) => c.teachers, { eager: true, cascade: true }),
    typeorm_1.JoinTable({
        name: 'user_course',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'courseId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], User.prototype, "courses", void 0);
__decorate([
    typeorm_1.OneToMany(type => History_1.History, history => history.user),
    __metadata("design:type", Array)
], User.prototype, "histories", void 0);
User = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(["email"])
], User);
exports.User = User;
//# sourceMappingURL=User.js.map