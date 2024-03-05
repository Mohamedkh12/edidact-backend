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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessContorlService = void 0;
const common_1 = require("@nestjs/common");
const role_enum_1 = require("../enums/role.enum");
let AccessContorlService = class AccessContorlService {
    constructor() {
        this.hierarchies = [];
        this.priority = 1;
        this.buildRoles([role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Child]);
    }
    buildRoles(roles) {
        const hierarchy = new Map();
        roles.forEach((role) => {
            hierarchy.set(role, this.priority);
            this.priority++;
        });
        this.hierarchies.push(hierarchy);
    }
    isAuthorized({ currentRole, requiredRole }) {
        for (let hierarchy of this.hierarchies) {
            const priority = hierarchy.get(currentRole);
            const requiredPriority = hierarchy.get(requiredRole);
            if (priority && requiredPriority && priority >= requiredPriority) {
                return true;
            }
        }
        return false;
    }
};
exports.AccessContorlService = AccessContorlService;
exports.AccessContorlService = AccessContorlService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AccessContorlService);
//# sourceMappingURL=access-control.service.js.map