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
const EntityBase_1 = require("../core/EntityBase");
const index_1 = require("typeorm/index");
var Types;
(function (Types) {
    Types["NUMBER"] = "number";
    Types["STRING"] = "string";
})(Types = exports.Types || (exports.Types = {}));
let Param = class Param extends EntityBase_1.EntityBase {
};
__decorate([
    index_1.PrimaryColumn(),
    __metadata("design:type", String)
], Param.prototype, "key", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Param.prototype, "value", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Param.prototype, "description", void 0);
Param = __decorate([
    typeorm_1.Entity()
], Param);
exports.Param = Param;
//# sourceMappingURL=Param.js.map