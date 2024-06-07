"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_controller_1 = require("./admin.controller");
const admin_service_1 = require("./admin.service");
const typeorm_1 = require("@nestjs/typeorm");
const admin_entity_1 = require("./entities/admin.entity");
const parents_module_1 = require("../parents/parents.module");
const roles_module_1 = require("../roles/roles.module");
const childs_module_1 = require("../childs/childs.module");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const exercises_module_1 = require("../exercises/exercises.module");
const exercises_service_1 = require("../exercises/exercises.service");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([admin_entity_1.Admin]),
            parents_module_1.ParentsModule,
            roles_module_1.RolesModule,
            childs_module_1.ChildsModule,
            exercises_module_1.ExercisesModule,
            passport_1.PassportModule.register({ session: true }),
            jwt_1.JwtModule.register({
                secret: 'SECRET-CODE142&of',
                signOptions: { expiresIn: '7d' },
                global: true,
            }),
        ],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService, exercises_service_1.ExercisesService],
        exports: [admin_service_1.AdminService, typeorm_1.TypeOrmModule],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map