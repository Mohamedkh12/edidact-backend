"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExercisesPlayedModule = void 0;
const common_1 = require("@nestjs/common");
const exercises_played_service_1 = require("./exercises-played.service");
const exercises_played_controller_1 = require("./exercises-played.controller");
const typeorm_1 = require("@nestjs/typeorm");
const exercises_played_entity_1 = require("./entities/exercises-played.entity");
const childs_entity_1 = require("../childs/entities/childs.entity");
const childs_service_1 = require("../childs/childs.service");
const childs_module_1 = require("../childs/childs.module");
const exercises_module_1 = require("../exercises/exercises.module");
let ExercisesPlayedModule = class ExercisesPlayedModule {
};
exports.ExercisesPlayedModule = ExercisesPlayedModule;
exports.ExercisesPlayedModule = ExercisesPlayedModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([exercises_played_entity_1.ExercisesPlayed, childs_entity_1.Children]), childs_module_1.ChildsModule, exercises_module_1.ExercisesModule],
        controllers: [exercises_played_controller_1.ExercisesPlayedController],
        providers: [exercises_played_service_1.ExercisesPlayedService, childs_service_1.ChildsService],
        exports: [typeorm_1.TypeOrmModule, exercises_played_service_1.ExercisesPlayedService],
    })
], ExercisesPlayedModule);
//# sourceMappingURL=exercises-played.module.js.map