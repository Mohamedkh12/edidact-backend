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
const bcrypt = require("bcrypt");
const typeorm_1 = require("@nestjs/typeorm");
const Codes_entity_1 = require("./PasswordRestCode/entite/Codes.entity");
const typeorm_2 = require("typeorm");
const parents_entity_1 = require("../parents/entities/parents.entity");
const admin_entity_1 = require("../admin/entities/admin.entity");
let MailService = class MailService {
    constructor(codeRepository, parentRepository, adminRepository) {
        this.codeRepository = codeRepository;
        this.parentRepository = parentRepository;
        this.adminRepository = adminRepository;
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
                // Recherche du parent par son adresse e-mail
                const parent = yield this.parentRepository.findOne({
                    where: { email: email },
                });
                // Recherche de l'admin par son adresse e-mail
                const admin = yield this.adminRepository.findOne({
                    where: { email: email },
                });
                if (!parent && !admin) {
                    // Si ni un parent ni un admin n'est trouvé
                    throw new Error('User with this email does not exist');
                }
                // Génération du code
                const code = Math.floor(1000 + Math.random() * 9000);
                const dateCreation = new Date();
                const dateExpiration = new Date(Date.now() + 60000);
                if (parent) {
                    // Enregistrement du code avec l'identifiant du parent trouvé
                    yield this.codeRepository.save({
                        code: code,
                        dateCreation: dateCreation,
                        dateExpiration: dateExpiration,
                        parent: { id: parent.id },
                    });
                    return code;
                }
                else if (admin) {
                    // Enregistrement du code avec l'identifiant de l'admin trouvé
                    yield this.codeRepository.save({
                        code: code,
                        dateCreation: dateCreation,
                        dateExpiration: dateExpiration,
                        admin: { id: admin.id },
                    });
                    return code;
                }
                const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 heures en millisecondes
                yield this.codeRepository.delete({
                    dateCreation: (0, typeorm_2.LessThan)(twentyFourHoursAgo),
                });
            }
            catch (error) {
                console.error('Error creating code:', error);
                throw error;
            }
        });
    }
    checkCodeExists(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingCode = yield this.codeRepository.findOne({
                    where: { code: code },
                });
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
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Vérifier si l'utilisateur est un parent ou un admin
                const user = (yield this.parentRepository.findOne({ where: { email } })) ||
                    (yield this.adminRepository.findOne({ where: { email } }));
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
                return { success: true, code: code };
            }
            catch (error) {
                console.error('Error sending email:', error);
                throw error;
            }
        });
    }
    getUserCodeCountToday(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Vérifier si l'utilisateur est un parent ou un admin
                const user = (yield this.parentRepository.findOne({ where: { email } })) ||
                    (yield this.adminRepository.findOne({ where: { email } }));
                if (!user) {
                    throw new Error('User with this email does not exist');
                }
                const today = new Date();
                const todayCodesCount = yield this.codeRepository.count({
                    where: {
                        [user instanceof parents_entity_1.Parents ? 'parent' : 'admin']: user,
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
    resendCode(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Vérifier si l'utilisateur est un parent ou un admin
                const user = (yield this.parentRepository.findOne({ where: { email } })) ||
                    (yield this.adminRepository.findOne({ where: { email } }));
                if (!user) {
                    throw new Error('User with this email does not exist');
                }
                // Vérifier s'il existe un code non expiré pour l'utilisateur
                const existingCode = yield this.codeRepository.findOne({
                    where: Object.assign(Object.assign({}, (user instanceof parents_entity_1.Parents ? { parent: user } : { admin: user })), { dateExpiration: (0, typeorm_2.MoreThan)(new Date()) }),
                });
                // Si existingCode est défini et plus d'une minute s'est écoulée depuis la création du code
                if (existingCode) {
                    const currentTime = new Date();
                    const timeDiff = currentTime.getTime() - existingCode.dateCreation.getTime();
                    const minutesPassed = Math.floor(timeDiff / (1000 * 60)); // Convertir en minutes
                    // Si plus d'une minute s'est écoulée depuis la création du code
                    if (minutesPassed >= 1) {
                        // Créer un nouveau code pour le parent ou l'admin
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
                    // S'il n'y a pas de code existant ou si le code existant est expiré, créer et envoyer un nouveau code
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
    resetPassword(newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Vérifier si le code existe et n'est pas expiré
                const existingCode = yield this.codeRepository
                    .createQueryBuilder('code')
                    .leftJoinAndSelect('code.parent', 'parent')
                    .where('code.dateExpiration > :currentDate', {
                    currentDate: new Date(),
                })
                    .getOne();
                const codeAdmin = yield this.codeRepository
                    .createQueryBuilder('code')
                    .leftJoinAndSelect('code.admin', 'admin')
                    .where('code.dateExpiration > :currentDate', {
                    currentDate: new Date(),
                })
                    .getOne();
                if (!existingCode && !codeAdmin) {
                    throw new Error('Invalid or expired verification code');
                }
                // Hasher le nouveau mot de passe
                const hashedPassword = yield bcrypt.hash(newPassword, 10);
                console.log('Password reset successfully');
                if (existingCode && existingCode.parent) {
                    yield this.parentRepository
                        .createQueryBuilder()
                        .update(parents_entity_1.Parents)
                        .set({ password: hashedPassword }) // Utiliser le mot de passe haché
                        .where('id = :id', { id: existingCode.parent.id })
                        .execute();
                }
                else if (codeAdmin && codeAdmin.admin) {
                    yield this.adminRepository
                        .createQueryBuilder()
                        .update(admin_entity_1.Admin)
                        .set({ password: hashedPassword }) // Utiliser le mot de passe haché
                        .where('id = :id', { id: codeAdmin.admin.id })
                        .execute();
                }
            }
            catch (error) {
                console.error('Error resetting password:', error);
                throw error;
            }
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Codes_entity_1.Codes)),
    __param(1, (0, typeorm_1.InjectRepository)(parents_entity_1.Parents)),
    __param(2, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MailService);
//# sourceMappingURL=mail.service.js.map