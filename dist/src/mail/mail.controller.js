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
exports.MailController = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("./mail.service");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const typeorm_1 = require("@nestjs/typeorm");
const parents_entity_1 = require("../parents/entities/parents.entity");
const typeorm_2 = require("typeorm");
const admin_entity_1 = require("../admin/entities/admin.entity");
let MailController = class MailController {
    constructor(mailService, parentRepository, adminRepository) {
        this.mailService = mailService;
        this.parentRepository = parentRepository;
        this.adminRepository = adminRepository;
    }
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = (yield this.parentRepository.findOne({ where: { email } })) ||
                    (yield this.adminRepository.findOne({ where: { email } }));
                if (!user) {
                    return { message: false, error: 'User with this email does not exist' };
                }
                const todayCodesCount = yield this.mailService.getUserCodeCountToday(email);
                if (todayCodesCount > 2) {
                    return {
                        success: false,
                        message: 'User has received three codes today',
                    };
                }
                else {
                    return yield this.mailService.forgotPassword(email);
                }
            }
            catch (error) {
                return {
                    message: 'Failed to send password reset email',
                    error: error.message,
                };
            }
        });
    }
    checkCodeExists(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingCode = yield this.mailService.checkCodeExists(code);
                if (existingCode) {
                    return {
                        success: true,
                        code: existingCode.code,
                    };
                }
                else {
                    return {
                        message: 'Code does not exist',
                    };
                }
            }
            catch (error) {
                return {
                    message: 'Failed to check code existence',
                    error: error.message,
                };
            }
        });
    }
    resetPassword(newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.mailService.resetPassword(newPassword);
                return { message: 'Password reset successfully' };
            }
            catch (error) {
                return { error: error.message };
            }
        });
    }
    resendCode(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todayCodesCount = yield this.mailService.getUserCodeCountToday(email);
                if (todayCodesCount > 2) {
                    return {
                        success: false,
                        message: 'User has received three codes today',
                    };
                }
                else {
                    return yield this.mailService.resendCode(email);
                }
            }
            catch (error) {
                return { success: false, message: error.message };
            }
        });
    }
};
exports.MailController = MailController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('forgotPassword'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MailController.prototype, "forgotPassword", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('check-code'),
    __param(0, (0, common_1.Body)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MailController.prototype, "checkCodeExists", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('resetPassword'),
    __param(0, (0, common_1.Body)('newPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MailController.prototype, "resetPassword", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('resend-code'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MailController.prototype, "resendCode", null);
exports.MailController = MailController = __decorate([
    (0, common_1.Controller)('mailer'),
    __param(1, (0, typeorm_1.InjectRepository)(parents_entity_1.Parents)),
    __param(2, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [mail_service_1.MailService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MailController);
//# sourceMappingURL=mail.controller.js.map