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
exports.ParentsController = void 0;
const common_1 = require("@nestjs/common");
const parents_service_1 = require("./parents.service");
const create_Parent_dto_1 = require("./dto/create-Parent.dto");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const multer_1 = require("@nestjs/platform-express/multer");
const roles_decorator_1 = require("../roles/decorators/roles.decorator");
const jwt_auth_guards_1 = require("../auth/strategy/jwt-auth.guards");
const r_les_guard_1 = require("../roles/guards/r\u00F4les.guard");
const update_child_1 = require("../childs/dto/update-child");
const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024;
let ParentsController = class ParentsController {
    constructor(parentsService) {
        this.parentsService = parentsService;
    }
    createParent(createPrentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.parentsService.createParent(createPrentDto);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.parentsService.findOne(id);
        });
    }
    findChild(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.parentsService.findOneChild(id);
        });
    }
    findAllChildren(parentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.parentsService.findAllChildren(parentId);
        });
    }
    uploadFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return file;
        });
    }
    createChildren(createChildrenDto, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdChildren = yield this.parentsService.createChildOrChildren(createChildrenDto, image);
                return createdChildren;
            }
            catch (error) {
                console.error('Erreur lors de la création :', error);
                throw new common_1.UnauthorizedException("Erreur lors de la création de l'enfant.");
            }
        });
    }
    updateChild(id, updateChildDto, image) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.parentsService.updateChild(id, updateChildDto, image);
        });
    }
    remove(id) {
        return this.parentsService.remove(+id);
    }
    getProfile(token) {
        return __awaiter(this, void 0, void 0, function* () {
            // Recherchez le parent dans la base de données
            if (!token) {
                throw new common_1.UnauthorizedException('Token is missing');
            }
            // Extrait le token du header Authorization (format: Bearer token)
            const tokenParts = token.split(' ');
            if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
                throw new common_1.UnauthorizedException();
            }
            const accessToken = tokenParts[1];
            const parent = yield this.parentsService.getParentFromToken(accessToken);
            if (!parent) {
                throw new common_1.NotFoundException('Parent not found');
            }
            return parent;
        });
    }
    getChildrenForParent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const names = yield this.parentsService.findChildrenNames(id);
            const ids = yield this.parentsService.findChildrenId(id);
            return names.map((name, index) => ({ id: ids[index], name }));
        });
    }
};
exports.ParentsController = ParentsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('createParent'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_Parent_dto_1.CreatePrentDto]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "createParent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuards, r_les_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Parent'),
    (0, common_1.Get)('findParent/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "findOne", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuards, r_les_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Parent'),
    (0, common_1.Get)('findChild/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "findChild", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuards, r_les_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Parent'),
    (0, common_1.Get)('findChildren/:parentId'),
    __param(0, (0, common_1.Param)('parentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "findAllChildren", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, multer_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES })
        .build({ errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "uploadFile", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('createChildren'),
    (0, common_1.UseInterceptors)((0, multer_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES })
        .build({ errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "createChildren", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuards, r_les_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Parent'),
    (0, common_1.UseInterceptors)((0, multer_1.FileInterceptor)('image')),
    (0, common_1.Patch)('updateChild/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES })
        .build({ errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_child_1.UpdateChild, Object]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "updateChild", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuards, r_les_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Parent'),
    (0, common_1.Delete)('remove/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ParentsController.prototype, "remove", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('parent'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "getProfile", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('childrenIdName/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "getChildrenForParent", null);
exports.ParentsController = ParentsController = __decorate([
    (0, common_1.Controller)('parents'),
    __metadata("design:paramtypes", [parents_service_1.ParentsService])
], ParentsController);
//# sourceMappingURL=parents.controller.js.map