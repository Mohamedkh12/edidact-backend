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
exports.JwtRefreshTokenStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const common_1 = require("@nestjs/common");
const jwtConstants_1 = require("../jwtConstants");
const typeorm_1 = require("@nestjs/typeorm");
const childs_entity_1 = require("../../childs/entities/childs.entity");
const typeorm_2 = require("typeorm");
const parents_entity_1 = require("../../parents/entities/parents.entity");
let JwtRefreshTokenStrategy = class JwtRefreshTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh-token') {
    constructor(childRepository, parentRepository) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromBodyField('refreshToken'),
            ignoreExpiration: true,
            secretOrKey: jwtConstants_1.jwtConstants.secret,
            passReqToCallback: true,
        });
        this.childRepository = childRepository;
        this.parentRepository = parentRepository;
    }
    validate(req, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            if (payload.role === 'parent') {
                user = yield this.parentRepository.findOne(payload.sub);
            }
            else if (payload.role === 'child') {
                user = yield this.childRepository.findOne(payload.sub);
            }
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            return {
                sub: payload.id,
                email: payload.email,
                password: payload.password,
                roleName: payload.roleName,
            };
        });
    }
};
exports.JwtRefreshTokenStrategy = JwtRefreshTokenStrategy;
exports.JwtRefreshTokenStrategy = JwtRefreshTokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(childs_entity_1.Children)),
    __param(1, (0, typeorm_1.InjectRepository)(parents_entity_1.Parents)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], JwtRefreshTokenStrategy);
//# sourceMappingURL=refreshToken.strategy.js.map