"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const roles_controller_1 = require("./roles/roles.controller");
const roles_service_1 = require("./roles/roles.service");
const roles_module_1 = require("./roles/roles.module");
const exercises_controller_1 = require("./exercises/exercises.controller");
const exercises_module_1 = require("./exercises/exercises.module");
const back_pack_controller_1 = require("./back-pack/back-pack.controller");
const back_pack_service_1 = require("./back-pack/back-pack.service");
const back_pack_module_1 = require("./back-pack/back-pack.module");
const auth_module_1 = require("./auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./users/entities/user.entity");
const roles_entity_1 = require("./roles/entities/roles.entity");
const exercises_entity_1 = require("./exercises/entities/exercises.entity");
const back_pack_entity_1 = require("./back-pack/entities/back_pack.entity");
const admin_module_1 = require("./admin/admin.module");
const childs_module_1 = require("./childs/childs.module");
const parents_module_1 = require("./parents/parents.module");
const parents_controller_1 = require("./parents/parents.controller");
const parents_service_1 = require("./parents/parents.service");
const childs_service_1 = require("./childs/childs.service");
const childs_controller_1 = require("./childs/childs.controller");
const childs_entity_1 = require("./childs/entities/childs.entity");
const parents_entity_1 = require("./parents/entities/parents.entity");
const admin_entity_1 = require("./admin/entities/admin.entity");
const admin_controller_1 = require("./admin/admin.controller");
const core_1 = require("@nestjs/core");
const r_les_guard_1 = require("./roles/guards/r\u00F4les.guard");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            exercises_module_1.ExercisesModule,
            back_pack_module_1.BackPackModule,
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'medkh',
                database: 'edidact',
                entities: [user_entity_1.User, back_pack_entity_1.Back_pack, roles_entity_1.Roles, exercises_entity_1.Exercises, childs_entity_1.Childs, parents_entity_1.Parents, admin_entity_1.Admin],
                synchronize: true,
            }),
            admin_module_1.AdminModule,
            parents_module_1.ParentsModule,
            childs_module_1.ChildsModule,
        ],
        controllers: [
            app_controller_1.AppController,
            roles_controller_1.RolesController,
            exercises_controller_1.ExercisesController,
            back_pack_controller_1.BackPackController,
            childs_controller_1.ChildsController,
            parents_controller_1.ParentsController,
            admin_controller_1.AdminController,
        ],
        providers: [
            app_service_1.AppService,
            roles_service_1.RolesService,
            back_pack_service_1.BackPackService,
            childs_service_1.ChildsService,
            parents_service_1.ParentsService, {
                provide: core_1.APP_GUARD,
                useClass: r_les_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map