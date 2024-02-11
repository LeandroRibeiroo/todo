import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1705701504908 implements MigrationInterface {
    name = 'Migrations1705701504908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "taskId" uuid NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "taskId"`);
    }

}
