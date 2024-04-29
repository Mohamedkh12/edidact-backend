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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt = require("jsonwebtoken");
const jwtConstants_1 = require("../../auth/jwtConstants");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = this.reflector.get('roles', context.getHandler());
            if (!roles) {
                return true;
            }
            const request = context.switchToHttp().getRequest();
            const token = this.extractTokenFromRequest(request);
            if (!token) {
                throw new common_1.UnauthorizedException('Token not found');
            }
            try {
                const user = yield this.verifyToken(token, jwtConstants_1.jwtConstants.secret);
                if (!user || !user.roleName) {
                    throw new common_1.UnauthorizedException('Invalid token');
                }
                const userRoles = Array.isArray(user.roleName)
                    ? user.roleName
                    : [user.roleName];
                const requiredRoles = roles.map((role) => role);
                const hasRequiredRole = requiredRoles.some((role) => userRoles.includes(role));
                if (!hasRequiredRole) {
                    throw new common_1.UnauthorizedException('Insufficient permissions');
                }
                return true;
            }
            catch (error) {
                throw new common_1.UnauthorizedException('Invalid token or insufficient permissions');
            }
        });
    }
    extractTokenFromRequest(request) {
        const authorizationHeader = request.headers['authorization'];
        if (!authorizationHeader) {
            return null;
        }
        const [, token] = authorizationHeader.split(' ');
        return token || null;
    }
    verifyToken(token, secretKey) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
//# sourceMappingURL=r%C3%B4les.guard.js.map