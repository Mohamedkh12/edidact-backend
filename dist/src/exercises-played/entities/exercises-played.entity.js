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
exports.ExercisesPlayed = void 0;
const typeorm_1 = require("typeorm");
const PrimaryGeneratedColumn_1 = require("typeorm/decorator/columns/PrimaryGeneratedColumn");
const childs_entity_1 = require("../../childs/entities/childs.entity");
const exercises_entity_1 = require("../../exercises/entities/exercises.entity");
let ExercisesPlayed = class ExercisesPlayed {
};
exports.ExercisesPlayed = ExercisesPlayed;
__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ExercisesPlayed.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => childs_entity_1.Children, (children) => children.exercisesPlayed),
    (0, typeorm_1.JoinColumn)({ name: 'child_id' }),
    __metadata("design:type", childs_entity_1.Children)
], ExercisesPlayed.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exercises_entity_1.Exercises, (exercices) => exercices.exercisesPlayed),
    (0, typeorm_1.JoinColumn)({ name: 'exercices_id' }),
    __metadata("design:type", exercises_entity_1.Exercises)
], ExercisesPlayed.prototype, "exercices", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ExercisesPlayed.prototype, "check", void 0);
exports.ExercisesPlayed = ExercisesPlayed = __decorate([
    (0, typeorm_1.Entity)()
], ExercisesPlayed);
//# sourceMappingURL=exercises-played.entity.js.map