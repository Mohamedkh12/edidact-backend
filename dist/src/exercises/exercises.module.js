"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExercisesModule = void 0;
const common_1 = require("@nestjs/common");
const exercises_service_1 = require("./exercises.service");
const typeorm_1 = require("@nestjs/typeorm");
const exercises_entity_1 = require("./entities/exercises.entity");
const exercises_controller_1 = require("./exercises.controller");
const roles_module_1 = require("../roles/roles.module");
const parents_module_1 = require("../parents/parents.module");
const parents_service_1 = require("../parents/parents.service");
const childs_service_1 = require("../childs/childs.service");
const childs_module_1 = require("../childs/childs.module");
let ExercisesModule = class ExercisesModule {
};
exports.ExercisesModule = ExercisesModule;
exports.ExercisesModule = ExercisesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([exercises_entity_1.Exercises]),
            roles_module_1.RolesModule,
            parents_module_1.ParentsModule,
            childs_module_1.ChildsModule,
        ],
        exports: [typeorm_1.TypeOrmModule, exercises_service_1.ExercisesService],
        controllers: [exercises_controller_1.ExercisesController],
        providers: [exercises_service_1.ExercisesService, parents_service_1.ParentsService, childs_service_1.ChildsService],
    })
], ExercisesModule);
//# sourceMappingURL=exercises.module.js.map