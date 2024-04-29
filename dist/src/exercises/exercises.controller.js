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
exports.ExercisesController = void 0;
const common_1 = require("@nestjs/common");
const r_les_guard_1 = require("../roles/guards/r\u00F4les.guard");
const jwt_auth_guards_1 = require("../auth/strategy/jwt-auth.guards");
const roles_decorator_1 = require("../roles/decorators/roles.decorator");
const create_exercice_dto_1 = require("./dto/create-exercice.dto");
const exercises_service_1 = require("./exercises.service");
const multer_1 = require("@nestjs/platform-express/multer");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024;
let ExercisesController = class ExercisesController {
    constructor(exercisesService) {
        this.exercisesService = exercisesService;
    }
    getAllExercises() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exercisesService.getAllExercises();
        });
    }
    /*
    @UseGuards(JwtAuthGuards, RolesGuard)
    @Roles('Parent', 'Admin')
    @Get(':id')
    async getExerciseById(@Param('id') id: number) {
      return this.exercisesService.getExerciseById(id);
    }*/
    getExercisesByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exercisesService.getExercisesByName(name);
        });
    }
    createExercise(createExerciseDto, image) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exercisesService.createExercise(createExerciseDto, image);
        });
    }
    updateExercise(id, updateExerciseDto, image) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exercisesService.updateExercise(id, updateExerciseDto, image);
        });
    }
    deleteExercise(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exercisesService.deleteExercise(id);
        });
    }
    findAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Inside findAllCategories method...');
            try {
                console.log('Fetching categories...');
                const categories = yield this.exercisesService.findAllCategories();
                return { categories };
            }
            catch (error) {
                console.error('Error in findAllCategories:', error);
                throw error;
            }
        });
    }
    getExercisesByCategory(category, imageFile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exercisesByCategory = yield this.exercisesService.getExercisesByCategory(category, imageFile);
                return exercisesByCategory;
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message,
                };
            }
        });
    }
    getExerciseCountByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exerciseCount = yield this.exercisesService.getExerciseCountByCategory(category);
                return exerciseCount;
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message,
                };
            }
        });
    }
    getCategoriesByClass(classe) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exercisesService.getCategoriesByClass(classe);
        });
    }
};
exports.ExercisesController = ExercisesController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuards, r_les_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Parent', 'Admin'),
    (0, common_1.Get)('getAllExercises'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "getAllExercises", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuards, r_les_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Parent', 'Admin'),
    (0, common_1.Get)('getExercisesByName/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "getExercisesByName", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('createExercise'),
    (0, common_1.UseInterceptors)((0, multer_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES })
        .build({ errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exercice_dto_1.CreateExerciseDto, Object]),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "createExercise", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuards, r_les_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Patch)('updateExercise/:id'),
    (0, common_1.UseInterceptors)((0, multer_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES })
        .build({ errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_exercice_dto_1.CreateExerciseDto, Object]),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "updateExercise", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuards, r_les_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Delete)('deleteExercise/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "deleteExercise", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('Categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "findAllCategories", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuards, r_les_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Parent', 'Admin', 'Child'),
    (0, common_1.UseInterceptors)((0, multer_1.FileInterceptor)('image')),
    (0, common_1.Get)('byCategory'),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "getExercisesByCategory", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuards, r_les_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Parent', 'Admin', 'Child'),
    (0, common_1.Get)('CountExercice'),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "getExerciseCountByCategory", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuards, r_les_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Parent', 'Admin', 'Child'),
    (0, common_1.Get)('classeCategory'),
    __param(0, (0, common_1.Query)('classe')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "getCategoriesByClass", null);
exports.ExercisesController = ExercisesController = __decorate([
    (0, common_1.Controller)('exercises'),
    __metadata("design:paramtypes", [exercises_service_1.ExercisesService])
], ExercisesController);
//# sourceMappingURL=exercises.controller.js.map