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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackPackService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const back_pack_entity_1 = require("./entities/back_pack.entity");
const exercises_entity_1 = require("../exercises/entities/exercises.entity");
let BackPackService = class BackPackService {
    constructor(backPackRepository, exercisesRepository) {
        this.backPackRepository = backPackRepository;
        this.exercisesRepository = exercisesRepository;
    }
    addToBackPack(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { parentId, childId, exerciseId } = dto;
            try {
                // Recherchez le Back_pack existant avec la même combinaison de parent et child
                let backPack = yield this.backPackRepository.findOne({
                    where: { parent: { id: parentId }, child: { id: childId } },
                    relations: ['exercises'],
                });
                // Si un Back_pack existe, ajoutez les nouveaux exercices à ce Back_pack
                if (backPack) {
                    const newExercises = yield Promise.all(exerciseId.map((id) => this.exercisesRepository.findOne({ where: { id } })));
                    // Vérifiez que les exercices existent
                    if (!newExercises.every(exercise => exercise !== undefined)) {
                        throw new Error('One or more exercises not found');
                    }
                    // Ajoutez les nouveaux exercices à la liste existante
                    backPack.exercises.push(...newExercises);
                    // Sauvegardez le Back_pack avec les nouvelles valeurs d'exercices
                    return this.backPackRepository.save(backPack);
                }
                // Si aucun Back_pack n'existe, créez un nouveau Back_pack avec les exercices fournis
                const parent = { id: parentId };
                const child = { id: childId };
                const exercises = yield Promise.all(exerciseId.map((id) => this.exercisesRepository.findOne({ where: { id } })));
                console.log("exercises :", exercises);
                // Vérifiez que les exercices existent
                if (!exercises.every(exercise => exercise !== undefined)) {
                    throw new Error('One or more exercises not found');
                }
                backPack = this.backPackRepository.create({
                    parent,
                    child,
                    exercises,
                });
                console.log("backPack :", backPack);
                // Sauvegardez le nouveau Back_pack
                return this.backPackRepository.save(backPack);
            }
            catch (error) {
                console.error('Error adding exercise to backpack:', error);
                throw error;
            }
        });
    }
    removeExerciseFromBackpack(backPackId, exerciseId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Trouver le backPack associé à l'exercice
            const backPack = yield this.backPackRepository.findOne({
                relations: ['exercises'],
                where: { id: backPackId },
            });
            if (!backPack) {
                throw new Error('Back_pack not found');
            }
            // Supprimer l'exercice de la relation ManyToMany
            yield this.backPackRepository
                .createQueryBuilder()
                .relation(back_pack_entity_1.Back_pack, 'exercises')
                .of(backPack)
                .remove(exerciseId);
            // Retourner le Back_pack mis à jour
            return backPack;
        });
    }
    getBackPackByParent(parentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.backPackRepository.find({
                where: { parent: { id: parentId } },
                relations: ['exercises'],
            });
        });
    }
    getBackPackByChild(childId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.backPackRepository.find({
                where: { child: { id: childId } },
                relations: ['exercises'],
            });
        });
    }
    getExercisesByCategoryAndSubcategory(idChild) {
        return __awaiter(this, void 0, void 0, function* () {
            const backPack = yield this.backPackRepository.findOne({
                relations: ['exercises'],
                where: { child: { id: idChild } },
            });
            if (!backPack) {
                throw new common_1.NotFoundException('Back_pack not found');
            }
            const exercisesByCategoryAndSubcategory = {};
            backPack.exercises.forEach((exercise) => {
                const { category, sub_category } = exercise;
                if (!exercisesByCategoryAndSubcategory[category]) {
                    exercisesByCategoryAndSubcategory[category] = {};
                }
                if (!exercisesByCategoryAndSubcategory[category][sub_category]) {
                    exercisesByCategoryAndSubcategory[category][sub_category] = [];
                }
                exercisesByCategoryAndSubcategory[category][sub_category].push(exercise);
            });
            return exercisesByCategoryAndSubcategory;
        });
    }
};
exports.BackPackService = BackPackService;
exports.BackPackService = BackPackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(back_pack_entity_1.Back_pack)),
    __param(1, (0, typeorm_1.InjectRepository)(exercises_entity_1.Exercises)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BackPackService);
//# sourceMappingURL=back-pack.service.js.map