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
const Schedule_1 = require("./Schedule");
const User_1 = require("./User");
const Course_1 = require("./Course");
let Grade = class Grade extends EntityBase_1.EntityBase {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Grade.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Grade.prototype, "name", void 0);
__decorate([
    typeorm_1.OneToMany(type => Schedule_1.Schedule, schedule => schedule.grade),
    __metadata("design:type", Array)
], Grade.prototype, "schedules", void 0);
__decorate([
    typeorm_1.OneToMany(type => User_1.User, user => user.grade),
    __metadata("design:type", Array)
], Grade.prototype, "users", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => User_1.User, (u) => u.grades),
    __metadata("design:type", Array)
], Grade.prototype, "teachers", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Course_1.Course, (c) => c.grades, { eager: true, cascade: true }),
    typeorm_1.JoinTable({
        name: 'grade_course',
        joinColumn: { name: 'gradeId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'courseId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Grade.prototype, "courses", void 0);
Grade = __decorate([
    typeorm_1.Entity()
], Grade);
exports.Grade = Grade;
//# sourceMappingURL=Grade.js.map