"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("./mail.service");
const mailer_1 = require("@nestjs-modules/mailer");
const mail_controller_1 = require("./mail.controller");
const parents_service_1 = require("../parents/parents.service");
const parents_module_1 = require("../parents/parents.module");
const typeorm_1 = require("@nestjs/typeorm");
const Codes_entity_1 = require("./PasswordRestCode/entite/Codes.entity");
const childs_module_1 = require("../childs/childs.module");
const roles_module_1 = require("../roles/roles.module");
let MailModule = class MailModule {
};
exports.MailModule = MailModule;
exports.MailModule = MailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule,
            parents_module_1.ParentsModule,
            childs_module_1.ChildsModule,
            roles_module_1.RolesModule,
            typeorm_1.TypeOrmModule.forFeature([Codes_entity_1.Codes]),
        ],
        controllers: [mail_controller_1.MailController],
        providers: [mail_service_1.MailService, parents_service_1.ParentsService],
    })
], MailModule);
//# sourceMappingURL=mail.module.js.map