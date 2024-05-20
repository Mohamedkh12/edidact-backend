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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackPackController = void 0;
const common_1 = require("@nestjs/common");
const back_pack_service_1 = require("./back-pack.service");
const create_backpack_dto_1 = require("./dto/create-backpack.dto");
const jwt_auth_guards_1 = require("../auth/strategy/jwt-auth.guards");
const r_les_guard_1 = require("../roles/guards/r\u00F4les.guard");
const roles_decorator_1 = require("../roles/decorators/roles.decorator");
let BackPackController = class BackPackController {
    constructor(backPackService) {
        this.backPackService = backPackService;
    }
    addToBackPack(dto) {
        return this.backPackService.addToBackPack(dto);
    }
    removeFromBackPack(idBackPack, idExercise) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.backPackService.removeExerciseFromBackpack(idBackPack, idExercise);
        });
    }
    getBackPackByParent(id) {
        return this.backPackService.getBackPackByParent(id);
    }
    getBackPackByChild(id) {
        console.log(id);
        return this.backPackService.getBackPackByChild(id);
    }
};
exports.BackPackController = BackPackController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuards, r_les_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Parent'),
    (0, common_1.Post)('addToBackPack'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_backpack_dto_1.CreateBackpackDto]),
    __metadata("design:returntype", void 0)
], BackPackController.prototype, "addToBackPack", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuards, r_les_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Parent'),
    (0, common_1.Delete)('removeFromBackPack'),
    __param(0, (0, common_1.Query)('idBackPack')),
    __param(1, (0, common_1.Query)('idExercise')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BackPackController.prototype, "removeFromBackPack", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuards, r_les_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Parent'),
    (0, common_1.Get)('getBackPackByParent/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BackPackController.prototype, "getBackPackByParent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuards, r_les_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Parent', 'Child'),
    (0, common_1.Get)('getBackPackByChild/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BackPackController.prototype, "getBackPackByChild", null);
exports.BackPackController = BackPackController = __decorate([
    (0, common_1.Controller)('backpack'),
    __metadata("design:paramtypes", [back_pack_service_1.BackPackService])
], BackPackController);
//# sourceMappingURL=back-pack.controller.js.map