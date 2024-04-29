"use strict";
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
exports.MigrationTable1710848760558 = void 0;
class MigrationTable1710848760558 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" ADD "tel" integer`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "lastname" character varying(255)`);
            yield queryRunner.query(`ALTER TABLE "childs" ADD "email" text`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tel"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastname"`);
            yield queryRunner.query(`ALTER TABLE "childs" DROP COLUMN "email"`);
        });
    }
}
exports.MigrationTable1710848760558 = MigrationTable1710848760558;
//# sourceMappingURL=1710848760558-migrationTable.js.map