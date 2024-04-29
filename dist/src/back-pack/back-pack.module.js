"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackPackModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const back_pack_entity_1 = require("./entities/back_pack.entity");
const back_pack_controller_1 = require("./back-pack.controller");
const back_pack_service_1 = require("./back-pack.service");
const exercises_module_1 = require("../exercises/exercises.module");
const exercises_service_1 = require("../exercises/exercises.service");
const childs_module_1 = require("../childs/childs.module");
const roles_module_1 = require("../roles/roles.module");
const parents_module_1 = require("../parents/parents.module");
let BackPackModule = class BackPackModule {
};
exports.BackPackModule = BackPackModule;
exports.BackPackModule = BackPackModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([back_pack_entity_1.Back_pack]),
            exercises_module_1.ExercisesModule,
            childs_module_1.ChildsModule,
            roles_module_1.RolesModule,
            parents_module_1.ParentsModule,
        ],
        controllers: [back_pack_controller_1.BackPackController],
        providers: [back_pack_service_1.BackPackService, exercises_service_1.ExercisesService],
        exports: [typeorm_1.TypeOrmModule, back_pack_service_1.BackPackService],
    })
], BackPackModule);
//# sourceMappingURL=back-pack.module.js.map