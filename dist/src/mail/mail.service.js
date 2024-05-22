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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Codes_entity_1 = require("./PasswordRestCode/entite/Codes.entity");
const user_entity_1 = require("../users/entities/user.entity");
const bcrypt = require("bcrypt");
let MailService = class MailService {
    constructor(codeRepository, userRepository) {
        this.codeRepository = codeRepository;
        this.userRepository = userRepository;
        this.transporter = nodemailer.createTransport({
            host: 'mail.infomaniak.com',
            port: 587,
            secure: false,
            tls: {
                rejectUnauthorized: true,
            },
            auth: {
                user: 'hello@edidact.ch',
                pass: 'School3.0',
            },
        });
    }
    createCode(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({ where: { email } });
                if (!user) {
                    throw new Error('User with this email does not exist');
                }
                const code = Math.floor(1000 + Math.random() * 9000);
                const dateCreation = new Date();
                const dateExpiration = new Date(Date.now() + 60000);
                yield this.codeRepository.save({
                    code,
                    dateCreation,
                    dateExpiration,
                    user: { id: user.id },
                });
                return code;
            }
            catch (error) {
                console.error('Error creating code:', error);
                throw error;
            }
        });
    }
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({ where: { email } });
                if (!user) {
                    throw new Error('User with this email does not exist');
                }
                const code = yield this.createCode(email);
                yield this.transporter.sendMail({
                    from: 'hello@edidact.ch',
                    to: email,
                    subject: 'Reset Password',
                    html: `<p>Your code is: ${code}</p>`,
                });
                console.log('Email sent successfully');
                return { success: true, code };
            }
            catch (error) {
                console.error('Error sending email:', error);
                throw error;
            }
        });
    }
    resetPassword(code, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingCode = yield this.codeRepository.findOne({
                    where: { code },
                    relations: ['user'],
                });
                if (!existingCode || !existingCode.user) {
                    throw new Error('Invalid or expired verification code');
                }
                const currentDate = new Date();
                if (existingCode.dateExpiration < currentDate) {
                    throw new Error('Code expired');
                }
                const hashedPassword = yield bcrypt.hash(newPassword, 10);
                yield this.userRepository
                    .createQueryBuilder()
                    .update(user_entity_1.User)
                    .set({ password: hashedPassword })
                    .where('id = :id', { id: existingCode.user.id })
                    .execute();
                console.log('Password reset successfully');
            }
            catch (error) {
                console.error('Error resetting password:', error);
                throw error;
            }
        });
    }
    resendCode(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({ where: { email } });
                if (!user) {
                    throw new Error('User with this email does not exist');
                }
                const existingCode = yield this.codeRepository.findOne({
                    where: {
                        user: { id: user.id },
                        dateExpiration: (0, typeorm_2.MoreThan)(new Date()),
                    },
                });
                if (existingCode) {
                    const currentTime = new Date();
                    const timeDiff = currentTime.getTime() - existingCode.dateCreation.getTime();
                    const minutesPassed = Math.floor(timeDiff / (1000 * 60));
                    if (minutesPassed >= 1) {
                        const newCode = yield this.createCode(email);
                        yield this.transporter.sendMail({
                            from: 'hello@edidact.ch',
                            to: email,
                            subject: 'Reset Password',
                            html: `<p>Your new reset code is: ${newCode}</p>`,
                        });
                        console.log('New code sent successfully');
                        return { success: true, code: newCode };
                    }
                }
                else {
                    const newCode = yield this.createCode(email);
                    yield this.transporter.sendMail({
                        from: 'hello@edidact.ch',
                        to: email,
                        subject: 'Reset Password',
                        html: `<p>Your new reset code is: ${newCode}</p>`,
                    });
                    console.log('New code sent successfully');
                    return { success: true, code: newCode };
                }
            }
            catch (error) {
                console.error('Error resending email:', error);
                throw error;
            }
        });
    }
    checkCodeExists(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingCode = yield this.codeRepository.findOne({
                    where: { code },
                });
                if (!existingCode) {
                    throw new Error('Code does not exist');
                }
                const currentDate = new Date();
                if (existingCode.dateExpiration < currentDate) {
                    throw new Error('Code expired');
                }
                return { success: true, code: existingCode };
            }
            catch (error) {
                console.error('Error checking code existence:', error);
                throw error;
            }
        });
    }
    getUserCodeCountToday(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({ where: { email } });
                if (!user) {
                    throw new Error('User with this email does not exist');
                }
                const today = new Date();
                const todayCodesCount = yield this.codeRepository.count({
                    where: {
                        user: { id: user.id },
                        dateCreation: (0, typeorm_2.Between)(new Date(today.getFullYear(), today.getMonth(), today.getDate()), today),
                    },
                });
                return todayCodesCount;
            }
            catch (error) {
                console.error('Error getting user code count:', error);
                throw error;
            }
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Codes_entity_1.Codes)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MailService);
//# sourceMappingURL=mail.service.js.map