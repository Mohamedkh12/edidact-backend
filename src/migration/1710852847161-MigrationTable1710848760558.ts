import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationTable17108487605581710852847161
  implements MigrationInterface
{
  name = 'MigrationTable17108487605581710852847161';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "lastname" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ADD "tel" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "parents" ADD "lastname" text NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "parents" ADD "tel" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "childs" ADD "lastname" text NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "childs" ADD "tel" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "admin" ADD "lastname" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "admin" ADD "tel" integer NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "tel"`);
    await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "lastname"`);
    await queryRunner.query(`ALTER TABLE "childs" DROP COLUMN "tel"`);
    await queryRunner.query(`ALTER TABLE "childs" DROP COLUMN "lastname"`);
    await queryRunner.query(`ALTER TABLE "parents" DROP COLUMN "tel"`);
    await queryRunner.query(`ALTER TABLE "parents" DROP COLUMN "lastname"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tel"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastname"`);
  }
}
