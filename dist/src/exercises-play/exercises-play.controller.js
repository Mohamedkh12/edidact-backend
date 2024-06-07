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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExercisesPlayController = void 0;
const common_1 = require("@nestjs/common");
const exercises_play_service_1 = require("./exercises-play.service");
const create_exercises_play_dto_1 = require("./dto/create-exercises-play.dto");
const update_exercises_play_dto_1 = require("./dto/update-exercises-play.dto");
let ExercisesPlayController = class ExercisesPlayController {
    constructor(exercisesPlayService) {
        this.exercisesPlayService = exercisesPlayService;
    }
    create(createExercisesPlayDto) {
        return this.exercisesPlayService.create(createExercisesPlayDto);
    }
    findAll() {
        return this.exercisesPlayService.findAll();
    }
    findOne(id) {
        return this.exercisesPlayService.findOne(+id);
    }
    update(id, updateExercisesPlayDto) {
        return this.exercisesPlayService.update(+id, updateExercisesPlayDto);
    }
    remove(id) {
        return this.exercisesPlayService.remove(+id);
    }
};
exports.ExercisesPlayController = ExercisesPlayController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exercises_play_dto_1.CreateExercisesPlayDto]),
    __metadata("design:returntype", void 0)
], ExercisesPlayController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExercisesPlayController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExercisesPlayController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_exercises_play_dto_1.UpdateExercisesPlayDto]),
    __metadata("design:returntype", void 0)
], ExercisesPlayController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExercisesPlayController.prototype, "remove", null);
exports.ExercisesPlayController = ExercisesPlayController = __decorate([
    (0, common_1.Controller)('exercises-play'),
    __metadata("design:paramtypes", [exercises_play_service_1.ExercisesPlayService])
], ExercisesPlayController);
//# sourceMappingURL=exercises-play.controller.js.map