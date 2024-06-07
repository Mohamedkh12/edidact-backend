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
exports.ExercisesPlayedService = void 0;
const common_1 = require("@nestjs/common");
const exercises_entity_1 = require("../exercises/entities/exercises.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const childs_entity_1 = require("../childs/entities/childs.entity");
const exercises_played_entity_1 = require("./entities/exercises-played.entity");
let ExercisesPlayedService = class ExercisesPlayedService {
    constructor(exercisesPlayedRepository, exercisesRepository, childrenRepository) {
        this.exercisesPlayedRepository = exercisesPlayedRepository;
        this.exercisesRepository = exercisesRepository;
        this.childrenRepository = childrenRepository;
    }
    create(createExercisesPlayedDto) {
        return 'This action adds a new exercisesPlayed';
    }
    /*async findAll(childId:number): Promise<any> {
      try {
        const exercisesPlayedRepository = getRepository(ExercisesPlayed);
  
        // Construct the query using QueryBuilder
        const playedExercises = await exercisesPlayedRepository.createQueryBuilder("exercisesPlayed")
          .innerJoinAndSelect("exercisesPlayed.children", "children", "children.id = :childId", { childId })
          .getMany();
  
        return playedExercises;
        
      }catch (error) {
        console.error('Error fetching active exercises by sub-category:', error);
        throw error;
      }
    }
  
    findOne(id: number) {
      return `This action returns a #${id} exercisesPlayed`;
    }*/
    update(id, updateExercisesPlayedDto) {
        return `This action updates a #${id} exercisesPlayed`;
    }
    remove(id) {
        return `This action removes a #${id} exercisesPlayed`;
    }
};
exports.ExercisesPlayedService = ExercisesPlayedService;
exports.ExercisesPlayedService = ExercisesPlayedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exercises_played_entity_1.ExercisesPlayed)),
    __param(1, (0, typeorm_1.InjectRepository)(exercises_entity_1.Exercises)),
    __param(2, (0, typeorm_1.InjectRepository)(childs_entity_1.Children)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ExercisesPlayedService);
//# sourceMappingURL=exercises-played.service.js.map