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
const back_pack_entity_1 = require("../../back-pack/entities/back_pack.entity");
const exercises_played_entity_1 = require("../../exercises-played/entities/exercises-played.entity");
let Exercises = class Exercises {
};
exports.Exercises = Exercises;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Exercises.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Exercises.prototype, "classe", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Exercises.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Exercises.prototype, "sub_category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Exercises.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Exercises.prototype, "link", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Exercises.prototype, "objective", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Exercises.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Exercises.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Exercises.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => back_pack_entity_1.Back_pack, (backpack) => backpack.exercises, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Exercises.prototype, "backpacks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exercises_played_entity_1.ExercisesPlayed, (exercices) => exercices.exercices),
    __metadata("design:type", exercises_played_entity_1.ExercisesPlayed)
], Exercises.prototype, "exercisesPlayed", void 0);
exports.Exercises = Exercises = __decorate([
    (0, typeorm_1.Entity)()
], Exercises);
//# sourceMappingURL=exercises.entity.js.map