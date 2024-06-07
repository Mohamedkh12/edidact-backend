"use strict";
// @ts-ignore
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
const parents_entity_1 = require("../parents/entities/parents.entity");
const childs_entity_1 = require("../childs/entities/childs.entity");
let ExercisesService = class ExercisesService {
    constructor(exercisesRepository, parentsRepository, childrenRepository) {
        this.exercisesRepository = exercisesRepository;
        this.parentsRepository = parentsRepository;
        this.childrenRepository = childrenRepository;
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
    createExercise(createExerciseDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newExercise = new exercises_entity_1.Exercises();
                newExercise.classe = createExerciseDto.classe;
                newExercise.category = createExerciseDto.category;
                newExercise.sub_category = createExerciseDto.sub_category;
                newExercise.name = createExerciseDto.name;
                newExercise.link = createExerciseDto.link;
                newExercise.active = createExerciseDto.active;
                newExercise.objective = createExerciseDto.objective;
                newExercise.created_at = new Date();
                const ex = yield this.exercisesRepository.save(newExercise);
                return ex;
            }
            catch (error) {
                throw new Error(`Failed to create exercise: ${error.message}`);
            }
        });
    }
    updateExercise(id, updateExerciseDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Récupérer l'exercice à mettre à jour
                const exercise = yield this.exercisesRepository.findOne({ where: { id: id } });
                if (!exercise) {
                    throw new common_1.NotFoundException("L'exercice n'existe pas");
                }
                // Mettre à jour les propriétés de l'exercice avec les nouvelles données
                exercise.classe = updateExerciseDto.classe;
                exercise.category = updateExerciseDto.category;
                exercise.sub_category = updateExerciseDto.sub_category;
                exercise.name = updateExerciseDto.name;
                exercise.active = updateExerciseDto.active;
                exercise.link = updateExerciseDto.link;
                exercise.objective = updateExerciseDto.objective;
                exercise.updated_at = new Date();
                // Sauvegarder l'exercice mis à jour dans la base de données
                const updatedExercise = yield this.exercisesRepository.save(exercise);
                return updatedExercise;
            }
            catch (error) {
                // Gérer les erreurs, par exemple, journaliser l'erreur ou la renvoyer au client
                console.error('Erreur lors de la mise à jour de l\'exercice :', error);
                throw new common_1.InternalServerErrorException("Une erreur s'est produite lors de la mise à jour de l'exercice.");
            }
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
    findAllSubCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subCategories = yield this.exercisesRepository
                    .createQueryBuilder('exercises')
                    .select('DISTINCT exercises.sub_category')
                    .getRawMany();
                return subCategories.map((subCategory) => subCategory.sub_category);
            }
            catch (error) {
                console.error('Erreur lors de la récupération des sous-catégories :', error);
                throw error;
            }
        });
    }
    deleteExercise(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Trouver l'exercice par ID
            const exercise = yield this.exercisesRepository.findOne({
                where: { id },
            });
            if (!exercise) {
                throw new Error('Exercise not found');
            }
            // Maintenant, vous pouvez supprimer l'exercice
            yield this.exercisesRepository.remove(exercise);
        });
    }
    //afficher les exercices par categories
    getExercisesByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const exercises = yield this.exercisesRepository
                .createQueryBuilder('exercise')
                .where('exercise.category = :category', { category })
                .select('*')
                .getMany();
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
    getAllClasses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classes = yield this.exercisesRepository
                    .createQueryBuilder('exercise')
                    .select('DISTINCT exercise.classe')
                    .getRawMany();
                return classes.map((exercise) => exercise.classe);
            }
            catch (error) {
                console.error('Error fetching classes:', error);
                throw error;
            }
        });
    }
    getCategoriesByClass() {
        return __awaiter(this, void 0, void 0, function* () {
            const exercises = yield this.exercisesRepository.find();
            const result = exercises.reduce((acc, exercise) => {
                if (!acc[exercise.classe]) {
                    acc[exercise.classe] = new Set();
                }
                acc[exercise.classe].add(exercise.category);
                return acc;
            }, {});
            for (const key in result) {
                result[key] = Array.from(result[key]);
            }
            console.log("Categories :", result);
            return result;
        });
    }
    getSubCategoryByCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            const exercises = yield this.exercisesRepository.find();
            const result = exercises.reduce((acc, exercise) => {
                if (!acc[exercise.category]) {
                    acc[exercise.category] = new Set();
                }
                acc[exercise.category].add(exercise.sub_category);
                return acc;
            }, {});
            for (const key in result) {
                result[key] = Array.from(result[key]);
            }
            return result;
        });
    }
    getExercisesBySubCategory(classParam, category, subCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exercises = yield this.exercisesRepository.find({ where: { classe: classParam, sub_category: subCategory, category: category } });
                return exercises;
            }
            catch (error) {
                console.error('Error fetching exercises by sub-category:', error);
                throw error;
            }
        });
    }
    getActiveExercisesBySubCategory(classParam, category, subCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Récupérer tous les exercices actifs dans la classe et la catégorie spécifiées
                const activeExercises = yield this.exercisesRepository.find({
                    where: {
                        classe: classParam,
                        category: category,
                        sub_category: subCategory,
                        active: '1',
                    },
                });
                return activeExercises;
            }
            catch (error) {
                console.error('Error fetching active exercises by sub-category:', error);
                throw error;
            }
        });
    }
    findExercises(category, subCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Récupérer tous les exercices actifs dans la classe et la catégorie spécifiées
                const activeExercises = yield this.exercisesRepository.find({
                    where: {
                        category: category,
                        sub_category: subCategory,
                        active: '1',
                    },
                });
                return activeExercises;
            }
            catch (error) {
                console.error('Error fetching active exercises by sub-category:', error);
                throw error;
            }
        });
    }
    changeExerciseStatus(exerciseId, newStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            const exercise = yield this.exercisesRepository.findOne({
                where: { id: exerciseId },
            });
            if (!exercise) {
                throw new Error(`L'exercice avec l'ID ${exerciseId} n'existe pas.`);
            }
            exercise.active = newStatus;
            exercise.updated_at = new Date();
            return this.exercisesRepository.save(exercise);
        });
    }
    getCategoriesByParentAndChild(idParent, childId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Vérifier si l'enfant spécifié existe pour le parent donné
                const child = yield this.childrenRepository
                    .createQueryBuilder('child')
                    .where('child.id = :childId AND child.parents.id = :idParent', { childId, idParent })
                    .getOne();
                if (!child) {
                    throw new common_1.NotFoundException('Child not found');
                }
                // Récupérer la classe de l'enfant
                const childClass = child.classe;
                // Récupérer les catégories pour la classe de l'enfant
                const categories = yield this.exercisesRepository
                    .createQueryBuilder('exercise')
                    .select('DISTINCT exercise.category')
                    .where('exercise.classe = :classe', { classe: childClass })
                    .getRawMany();
                const categoriesList = categories.map(category => category.category);
                return {
                    classe: childClass,
                    categories: categoriesList,
                };
            }
            catch (error) {
                if (error instanceof typeorm_2.EntityNotFoundError) {
                    throw new common_1.NotFoundException('Parent not found');
                }
                console.error('Error fetching categories by parent and child:', error);
                throw error;
            }
        });
    }
};
exports.ExercisesService = ExercisesService;
exports.ExercisesService = ExercisesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exercises_entity_1.Exercises)),
    __param(1, (0, typeorm_1.InjectRepository)(parents_entity_1.Parents)),
    __param(2, (0, typeorm_1.InjectRepository)(childs_entity_1.Children)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ExercisesService);
//# sourceMappingURL=exercises.service.js.map