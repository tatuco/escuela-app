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
const EntityBase_1 = require("../core/EntityBase");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Grade_1 = require("./Grade");
const Course_1 = require("./Course");
const History_1 = require("./History");
let File = class File extends EntityBase_1.EntityBase {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], File.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], File.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], File.prototype, "file", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], File.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => User_1.User, user => user.notices),
    typeorm_1.JoinColumn({ name: "userId" }),
    __metadata("design:type", User_1.User)
], File.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], File.prototype, "gradeId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Grade_1.Grade, grade => grade.users),
    typeorm_1.JoinColumn({ name: "gradeId" }),
    __metadata("design:type", Grade_1.Grade)
], File.prototype, "grade", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], File.prototype, "courseId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Course_1.Course, course => course.schedules),
    typeorm_1.JoinColumn({ name: "courseId" }),
    __metadata("design:type", Course_1.Course)
], File.prototype, "course", void 0);
__decorate([
    typeorm_1.OneToMany(type => History_1.History, history => history.file),
    __metadata("design:type", Array)
], File.prototype, "histories", void 0);
File = __decorate([
    typeorm_1.Entity()
], File);
exports.File = File;
//# sourceMappingURL=File.js.map