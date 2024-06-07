"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentsModule = void 0;
const common_1 = require("@nestjs/common");
const parents_controller_1 = require("./parents.controller");
const typeorm_1 = require("@nestjs/typeorm");
const parents_entity_1 = require("./entities/parents.entity");
const parents_service_1 = require("./parents.service");
const childs_service_1 = require("../childs/childs.service");
const childs_module_1 = require("../childs/childs.module");
const roles_module_1 = require("../roles/roles.module");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const users_module_1 = require("../users/users.module");
const users_service_1 = require("../users/users.service");
const user_entity_1 = require("../users/entities/user.entity");
let ParentsModule = class ParentsModule {
};
exports.ParentsModule = ParentsModule;
exports.ParentsModule = ParentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([parents_entity_1.Parents, user_entity_1.User]),
            childs_module_1.ChildsModule,
            roles_module_1.RolesModule,
            users_module_1.UsersModule,
            jwt_1.JwtModule.register({
                secret: 'SECRET-CODE142&of',
                signOptions: { expiresIn: '60m' },
                global: true,
            }),
            passport_1.PassportModule.register({ session: true }),
        ],
        exports: [typeorm_1.TypeOrmModule, parents_service_1.ParentsService, childs_service_1.ChildsService],
        controllers: [parents_controller_1.ParentsController],
        providers: [parents_service_1.ParentsService, childs_service_1.ChildsService, users_service_1.UsersService],
    })
], ParentsModule);
//# sourceMappingURL=parents.module.js.map