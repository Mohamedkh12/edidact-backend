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
exports.ExercisesPlay = void 0;
const typeorm_1 = require("typeorm");
const childs_entity_1 = require("../../childs/entities/childs.entity");
const back_pack_entity_1 = require("../../back-pack/entities/back_pack.entity");
const exercises_entity_1 = require("../../exercises/entities/exercises.entity");
class ExercisesPlay {
}
exports.ExercisesPlay = ExercisesPlay;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ExercisesPlay.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => childs_entity_1.Children, (child) => child.playedExercises, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'child_id' }),
    __metadata("design:type", childs_entity_1.Children)
], ExercisesPlay.prototype, "child", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => back_pack_entity_1.Back_pack, (backpack) => backpack.playedExercises, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'backpack_id' }),
    __metadata("design:type", back_pack_entity_1.Back_pack)
], ExercisesPlay.prototype, "backpack", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => exercises_entity_1.Exercises, (exercise) => exercise.playedExercises, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'exercise_id' }),
    __metadata("design:type", exercises_entity_1.Exercises)
], ExercisesPlay.prototype, "exercise", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ExercisesPlay.prototype, "check", void 0);
//# sourceMappingURL=exercises-play.entity.js.map