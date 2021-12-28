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
const Grade_1 = require("./Grade");
let Course = class Course extends EntityBase_1.EntityBase {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Course.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Course.prototype, "name", void 0);
__decorate([
    typeorm_1.OneToMany(type => Schedule_1.Schedule, schedule => schedule.course),
    __metadata("design:type", Array)
], Course.prototype, "schedules", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => User_1.User, (u) => u.courses),
    __metadata("design:type", Array)
], Course.prototype, "teachers", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => Grade_1.Grade, (u) => u.courses),
    __metadata("design:type", Array)
], Course.prototype, "grades", void 0);
Course = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(["name"])
], Course);
exports.Course = Course;
//# sourceMappingURL=Course.js.map