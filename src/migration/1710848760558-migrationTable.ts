import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationTable1710848760558 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "tel" integer`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "lastname" character varying(255)`,
    );
    await queryRunner.query(`ALTER TABLE "childs" ADD "email" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tel"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastname"`);
    await queryRunner.query(`ALTER TABLE "childs" DROP COLUMN "email"`);
  }
}
