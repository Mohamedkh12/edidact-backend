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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const childs_entity_1 = require("../childs/entities/childs.entity");
const parents_entity_1 = require("../parents/entities/parents.entity");
let AuthService = class AuthService {
    constructor(childRepository, parentRepository, jwtService) {
        this.childRepository = childRepository;
        this.parentRepository = parentRepository;
        this.jwtService = jwtService;
    }
    validateUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Vérifiez si l'utilisateur existe dans la table des parents
            const parent = yield this.parentRepository.findOne({ where: { username } });
            if (parent && (yield bcrypt.compare(password, parent.password))) {
                const { password } = parent, result = __rest(parent, ["password"]);
                return result;
            }
            // Vérifiez si l'utilisateur existe dans la table des enfants
            const child = yield this.childRepository.findOne({ where: { username } });
            if (child && (yield bcrypt.compare(password, child.password))) {
                const { password } = child, result = __rest(child, ["password"]);
                return result;
            }
            // Si ni le parent ni l'enfant n'est trouvé, retournez null
            return null;
        });
    }
    signIn(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const parent = yield this.parentRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.roles', 'roles')
                .where('user.username = :username', { username })
                .addSelect('roles.name')
                .getOne();
            let child = null;
            if (!parent) {
                child = yield this.childRepository
                    .createQueryBuilder('child')
                    .leftJoinAndSelect('child.roles', 'roles') // Ajoutez cette ligne pour récupérer les rôles de l'enfant
                    .where('child.username = :username', { username })
                    .addSelect('roles.name')
                    .getOne();
            }
            if (!parent && !child) {
                throw new common_1.UnauthorizedException('Invalid username or password');
            }
            const entity = parent || child;
            const isPasswordValid = yield bcrypt.compare(password, entity.password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('Invalid username or password');
            }
            const payload = {
                username: entity.username,
                sub: entity.id,
                roleName: entity.roles ? entity.roles.name : null,
            };
            const accessToken = this.jwtService.sign(payload);
            return { access_token: accessToken, user: entity };
        });
    }
    refreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = this.jwtService.verify(refreshToken);
                const payload = {
                    username: decoded.username,
                    sub: decoded.sub,
                    roleName: decoded.roleName,
                };
                return { refresh_Token: this.jwtService.sign(payload) };
            }
            catch (error) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
        });
    }
    checkUserRole(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = this.jwtService.verify(token);
                console.log('decoded token :', decoded);
                console.log('decoded.rol:', decoded.roleName);
                return decoded.roleName || null;
            }
            catch (error) {
                // Si le token est invalide ou expiré
                console.error('Invalid token:', error);
                return null;
            }
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(childs_entity_1.Childs)),
    __param(1, (0, typeorm_1.InjectRepository)(parents_entity_1.Parents)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map