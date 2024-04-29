"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildsModule = void 0;
const common_1 = require("@nestjs/common");
const childs_controller_1 = require("./childs.controller");
const childs_service_1 = require("./childs.service");
const typeorm_1 = require("@nestjs/typeorm");
const childs_entity_1 = require("./entities/childs.entity");
let ChildsModule = class ChildsModule {
};
exports.ChildsModule = ChildsModule;
exports.ChildsModule = ChildsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([childs_entity_1.Childs])],
        controllers: [childs_controller_1.ChildsController],
        providers: [childs_service_1.ChildsService],
        exports: [typeorm_1.TypeOrmModule, childs_service_1.ChildsService],
    })
], ChildsModule);
//# sourceMappingURL=childs.module.js.map