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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersService, jwtService, userRepository) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }
    async validateUser(username, password) {
        const user = await this.usersService.findOneByusername(username);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async signIn(username, password) {
        const user = await this.usersService.findOneByusername(username);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        console.log('Email:', user.email);
        console.log('User from DB:', user);
        const isPassword = await bcrypt.compare(password, user.password);
        console.log('Is Password Correct:', isPassword);
        if (!isPassword) {
            throw new common_1.UnauthorizedException('Wrong password');
        }
        const payload = {
            username: user.username,
            sub: user.username,
        };
        const token = this.jwtService.sign(payload);
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    refreshToken(user) {
        const payload = {
            email: user.email,
            sub: user.username
        };
        return {
            refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map