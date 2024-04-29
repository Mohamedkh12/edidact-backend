"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.CheckUserIdMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const jwt_decode_1 = require("jwt-decode");
let CheckUserIdMiddleware = class CheckUserIdMiddleware {
    use(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const decodedToken = this.decodeToken(token);
                const userIdFromToken = decodedToken ? decodedToken.sub : null;
                const userIdFromParams = req.params.id;
                if (userIdFromToken !== null && userIdFromToken == userIdFromParams) {
                    next();
                }
                else {
                    throw new common_1.ForbiddenException('Forbidden');
                }
            }
            catch (error) {
                throw new common_1.ForbiddenException('Forbidden');
            }
        });
    }
    decodeToken(token) {
        try {
            const decoded = (0, jwt_decode_1.jwtDecode)(token);
            return decoded;
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                console.error('Error decoding token:', error.message);
            }
            else {
                console.error('Unexpected error decoding token:', error);
            }
            return null;
        }
    }
};
exports.CheckUserIdMiddleware = CheckUserIdMiddleware;
exports.CheckUserIdMiddleware = CheckUserIdMiddleware = __decorate([
    (0, common_1.Injectable)()
], CheckUserIdMiddleware);
//# sourceMappingURL=enregistreur.middleware.js.map