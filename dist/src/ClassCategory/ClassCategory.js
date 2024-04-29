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
exports.ClassCategory = void 0;
const typeorm_1 = require("typeorm");
const exercises_entity_1 = require("../exercises/entities/exercises.entity");
let ClassCategory = class ClassCategory {
};
exports.ClassCategory = ClassCategory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ClassCategory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ClassCategory.prototype, "classe", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ClassCategory.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exercises_entity_1.Exercises, (exercise) => exercise.category),
    __metadata("design:type", Array)
], ClassCategory.prototype, "exercise", void 0);
exports.ClassCategory = ClassCategory = __decorate([
    (0, typeorm_1.Entity)('ClassCategory')
], ClassCategory);
//# sourceMappingURL=ClassCategory.js.map