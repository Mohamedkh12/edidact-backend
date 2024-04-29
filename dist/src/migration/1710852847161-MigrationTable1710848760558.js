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
exports.MigrationTable17108487605581710852847161 = void 0;
class MigrationTable17108487605581710852847161 {
    constructor() {
        this.name = 'MigrationTable17108487605581710852847161';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" ADD "lastname" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "tel" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "parents" ADD "lastname" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "parents" ADD "tel" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "childs" ADD "lastname" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "childs" ADD "tel" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "admin" ADD "lastname" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "admin" ADD "tel" integer NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "tel"`);
            yield queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "lastname"`);
            yield queryRunner.query(`ALTER TABLE "childs" DROP COLUMN "tel"`);
            yield queryRunner.query(`ALTER TABLE "childs" DROP COLUMN "lastname"`);
            yield queryRunner.query(`ALTER TABLE "parents" DROP COLUMN "tel"`);
            yield queryRunner.query(`ALTER TABLE "parents" DROP COLUMN "lastname"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tel"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastname"`);
        });
    }
}
exports.MigrationTable17108487605581710852847161 = MigrationTable17108487605581710852847161;
//# sourceMappingURL=1710852847161-MigrationTable1710848760558.js.map