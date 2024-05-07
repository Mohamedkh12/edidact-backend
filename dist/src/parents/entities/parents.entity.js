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
exports.Children = exports.Parents = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const childs_entity_1 = require("../../childs/entities/childs.entity");
Object.defineProperty(exports, "Children", { enumerable: true, get: function () { return childs_entity_1.Children; } });
const back_pack_entity_1 = require("../../back-pack/entities/back_pack.entity");
const Codes_entity_1 = require("../../mail/PasswordRestCode/entite/Codes.entity");
let Parents = class Parents extends user_entity_1.User {
};
exports.Parents = Parents;
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Parents.prototype, "tel", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => childs_entity_1.Children, (Children) => Children.parents, { cascade: true }),
    __metadata("design:type", Array)
], Parents.prototype, "childs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => back_pack_entity_1.Back_pack, (backpack) => backpack.parent),
    __metadata("design:type", Array)
], Parents.prototype, "backpacks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Codes_entity_1.Codes, (code) => code.parent),
    __metadata("design:type", Array)
], Parents.prototype, "codes", void 0);
exports.Parents = Parents = __decorate([
    (0, typeorm_1.Entity)('parents')
], Parents);
//# sourceMappingURL=parents.entity.js.map