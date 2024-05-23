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
exports.Children = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const parents_entity_1 = require("../../parents/entities/parents.entity");
const back_pack_entity_1 = require("../../back-pack/entities/back_pack.entity");
const bcrypt = require("bcrypt");
let Children = class Children {
    hashPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            this.password = yield bcrypt.hash(this.password, 10);
        });
    }
};
exports.Children = Children;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Children.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Children.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Children.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Children.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Children.prototype, "classe", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Children.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parents_entity_1.Parents, (parents) => parents.children),
    (0, typeorm_1.JoinColumn)({ name: 'id_parent' }),
    __metadata("design:type", parents_entity_1.Parents)
], Children.prototype, "parents", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => back_pack_entity_1.Back_pack, (backpack) => backpack.child),
    __metadata("design:type", back_pack_entity_1.Back_pack)
], Children.prototype, "backpack", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Children.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Children.prototype, "hashPassword", null);
exports.Children = Children = __decorate([
    (0, typeorm_1.Entity)('Children')
], Children);
//# sourceMappingURL=childs.entity.js.map