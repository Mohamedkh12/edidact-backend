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
const admin_module_1 = require("./admin/admin.module");
const childs_module_1 = require("./childs/childs.module");
const parents_module_1 = require("./parents/parents.module");
const parents_controller_1 = require("./parents/parents.controller");
const parents_service_1 = require("./parents/parents.service");
const childs_service_1 = require("./childs/childs.service");
const childs_controller_1 = require("./childs/childs.controller");
const admin_controller_1 = require("./admin/admin.controller");
const core_1 = require("@nestjs/core");
const r_les_guard_1 = require("./roles/guards/r\u00F4les.guard");
const exercises_service_1 = require("./exercises/exercises.service");
const passport_1 = require("@nestjs/passport");
const enregistreur_middleware_1 = require("./auth/middleware/enregistreur.middleware");
const mail_module_1 = require("./mail/mail.module");
const database_configue_1 = require("../database.configue");
const admin_service_1 = require("./admin/admin.service");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(enregistreur_middleware_1.CheckUserIdMiddleware).forRoutes('users/update/:id');
    }
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
            typeorm_1.TypeOrmModule.forRoot(database_configue_1.databaseConfig),
            admin_module_1.AdminModule,
            parents_module_1.ParentsModule,
            childs_module_1.ChildsModule,
            passport_1.PassportModule,
            mail_module_1.MailModule,
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
            exercises_service_1.ExercisesService,
            parents_service_1.ParentsService,
            admin_service_1.AdminService,
            {
                provide: core_1.APP_GUARD,
                useClass: r_les_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map