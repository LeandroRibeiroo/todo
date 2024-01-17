import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1705495909092 implements MigrationInterface {
    name = 'Migrations1705495909092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subtask" DROP CONSTRAINT "FK_23898de3c7e1bc98290f7a6ef6d"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_dc8cb2f0561bc6f09902a1dc88d"`);
        await queryRunner.query(`ALTER TABLE "subtask" RENAME COLUMN "taskTaskId" TO "taskId"`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "taskTaskId" TO "taskId"`);
        await queryRunner.query(`ALTER TABLE "subtask" ADD CONSTRAINT "FK_8209040ec2c518c62c70cd382dd" FOREIGN KEY ("taskId") REFERENCES "task"("taskId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_9fc19c95c33ef4d97d09b72ee95" FOREIGN KEY ("taskId") REFERENCES "task"("taskId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_9fc19c95c33ef4d97d09b72ee95"`);
        await queryRunner.query(`ALTER TABLE "subtask" DROP CONSTRAINT "FK_8209040ec2c518c62c70cd382dd"`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "taskId" TO "taskTaskId"`);
        await queryRunner.query(`ALTER TABLE "subtask" RENAME COLUMN "taskId" TO "taskTaskId"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_dc8cb2f0561bc6f09902a1dc88d" FOREIGN KEY ("taskTaskId") REFERENCES "task"("taskId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subtask" ADD CONSTRAINT "FK_23898de3c7e1bc98290f7a6ef6d" FOREIGN KEY ("taskTaskId") REFERENCES "task"("taskId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
