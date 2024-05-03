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
exports.Codes = void 0;
const typeorm_1 = require("typeorm");
const parents_entity_1 = require("../../../parents/entities/parents.entity");
const admin_entity_1 = require("../../../admin/entities/admin.entity");
let Codes = class Codes {
};
exports.Codes = Codes;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Codes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parents_entity_1.Parents, (parents) => parents.codes, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id_parent' }),
    __metadata("design:type", parents_entity_1.Parents)
], Codes.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_entity_1.Admin, (admin) => admin.codes, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id_admin' }),
    __metadata("design:type", admin_entity_1.Admin)
], Codes.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Codes.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Codes.prototype, "dateCreation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Codes.prototype, "dateExpiration", void 0);
exports.Codes = Codes = __decorate([
    (0, typeorm_1.Entity)()
], Codes);
//# sourceMappingURL=Codes.entity.js.map