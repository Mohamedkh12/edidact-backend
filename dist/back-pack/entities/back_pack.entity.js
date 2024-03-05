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
exports.Back_pack = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const exercises_entity_1 = require("../../exercises/entities/exercises.entity");
let Back_pack = class Back_pack {
};
exports.Back_pack = Back_pack;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Back_pack.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'idUser' }),
    __metadata("design:type", user_entity_1.User)
], Back_pack.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => exercises_entity_1.Exercises, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'idExercises' }),
    __metadata("design:type", exercises_entity_1.Exercises)
], Back_pack.prototype, "exercises", void 0);
exports.Back_pack = Back_pack = __decorate([
    (0, typeorm_1.Entity)()
], Back_pack);
//# sourceMappingURL=back_pack.entity.js.map