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
exports.Exercises = void 0;
const typeorm_1 = require("typeorm");
const childs_entity_1 = require("../../childs/entities/childs.entity");
const back_pack_entity_1 = require("../../back-pack/entities/back_pack.entity");
let Exercises = class Exercises {
};
exports.Exercises = Exercises;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Exercises.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Exercises.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Exercises.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Exercises.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Exercises.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Exercises.prototype, "assignment", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => childs_entity_1.Childs, (childs) => childs.exercises, { cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Exercises.prototype, "childs", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => back_pack_entity_1.Back_pack, (backpack) => backpack.exercises, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Exercises.prototype, "backpacks", void 0);
exports.Exercises = Exercises = __decorate([
    (0, typeorm_1.Entity)()
], Exercises);
//# sourceMappingURL=exercises.entity.js.map