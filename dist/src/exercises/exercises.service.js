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
exports.ExercisesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const exercises_entity_1 = require("./entities/exercises.entity");
let ExercisesService = class ExercisesService {
    constructor(exercisesRepository) {
        this.exercisesRepository = exercisesRepository;
    }
    getAllExercises() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exercisesRepository.find();
        });
    }
    getExerciseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exercise = yield this.exercisesRepository.findOne({ where: { id } });
            if (!exercise) {
                throw new common_1.NotFoundException('Exercise not found');
            }
            return exercise;
        });
    }
    getExercisesByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.exercisesRepository.find({ where: { name } });
        });
    }
    createExercise(createExerciseDto, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingExercise = yield this.exercisesRepository.findOne({
                where: { name: createExerciseDto.name },
            });
            if (existingExercise) {
                throw new common_1.NotFoundException('Exercise already exists');
            }
            const newExercise = new exercises_entity_1.Exercises();
            newExercise.name = createExerciseDto.name;
            newExercise.assignment = createExerciseDto.assignment;
            newExercise.category = createExerciseDto.category;
            newExercise.description = createExerciseDto.description;
            if (image) {
                newExercise.image = image.buffer.toString('base64');
            }
            console.log(newExercise);
            return yield this.exercisesRepository.save(newExercise);
        });
    }
    updateExercise(id, updateExerciseDto, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const exercise = yield this.getExerciseById(id);
            if (!exercise) {
                throw new common_1.NotFoundException("exercice doesn't exist");
            }
            if (image) {
                updateExerciseDto.image = image.buffer.toString('base64');
            }
            Object.assign(exercise, updateExerciseDto);
            return this.exercisesRepository.save(exercise);
        });
    }
    //afficher les categories
    findAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.exercisesRepository
                    .createQueryBuilder('exercises')
                    .select('DISTINCT exercises.category')
                    .getRawMany();
                return categories.map((category) => category.category);
            }
            catch (error) {
                console.error('Error fetching categories:', error);
                throw error;
            }
        });
    }
    deleteExercise(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Trouver l'exercice par ID
            const exercise = yield this.exercisesRepository.findOne({
                where: { id },
                relations: ['Children'],
            });
            if (!exercise) {
                throw new Error('Exercise not found');
            }
            // Maintenant, vous pouvez supprimer l'exercice
            yield this.exercisesRepository.remove(exercise);
        });
    }
    //afficher les exercices par categories
    getExercisesByCategory(category, image) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(category);
            const exercises = yield this.exercisesRepository
                .createQueryBuilder('exercise')
                .where('exercise.category = :category', { category })
                .select([
                'exercise.id',
                'exercise.name',
                'exercise.assignment',
                'exercise.category',
                'exercise.description',
                'exercise.image',
            ])
                .getMany();
            if (image) {
                exercises.forEach((exercise) => {
                    exercise.image = image.buffer.toString('base64');
                });
            }
            console.log(exercises);
            return exercises;
        });
    }
    //calculer nombre des exercices par categories
    getExerciseCountByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const exerciseCount = yield this.exercisesRepository
                .createQueryBuilder('exercise')
                .where('exercise.category = :category', { category })
                .getCount();
            return exerciseCount;
        });
    }
    getCategoriesByClass(classe) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield this.exercisesRepository
                    .createQueryBuilder('exercise')
                    .innerJoinAndSelect('exercise.Children', 'child')
                    .where('child.classe = :classe', { classe })
                    .select(['child.classe AS class', 'exercise.category AS category'])
                    .groupBy('child.classe, exercise.category')
                    .getRawMany();
                // Group categories by class
                const groupedCategories = results.reduce((acc, { class: classKey, category }) => {
                    if (!acc[classKey]) {
                        acc[classKey] = [];
                    }
                    acc[classKey].push(category);
                    return acc;
                }, {});
                return groupedCategories;
            }
            catch (error) {
                console.error('Error fetching categories by class:', error);
                throw error;
            }
        });
    }
};
exports.ExercisesService = ExercisesService;
exports.ExercisesService = ExercisesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exercises_entity_1.Exercises)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ExercisesService);
//# sourceMappingURL=exercises.service.js.map