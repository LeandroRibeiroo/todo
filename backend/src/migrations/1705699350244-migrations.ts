import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1705699350244 implements MigrationInterface {
    name = 'Migrations1705699350244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subtask" DROP CONSTRAINT "FK_8209040ec2c518c62c70cd382dd"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_9fc19c95c33ef4d97d09b72ee95"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "taskId" TO "taskTaskId"`);
        await queryRunner.query(`ALTER TABLE "subtask" ADD "taskTaskId" uuid`);
        await queryRunner.query(`ALTER TABLE "task" ADD "userUserId" uuid`);
        await queryRunner.query(`ALTER TABLE "subtask" ALTER COLUMN "taskId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subtask" ADD CONSTRAINT "FK_23898de3c7e1bc98290f7a6ef6d" FOREIGN KEY ("taskTaskId") REFERENCES "task"("taskId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_dc8cb2f0561bc6f09902a1dc88d" FOREIGN KEY ("taskTaskId") REFERENCES "task"("taskId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_6a0969fd6fe1312ec2e6637843a" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_6a0969fd6fe1312ec2e6637843a"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_dc8cb2f0561bc6f09902a1dc88d"`);
        await queryRunner.query(`ALTER TABLE "subtask" DROP CONSTRAINT "FK_23898de3c7e1bc98290f7a6ef6d"`);
        await queryRunner.query(`ALTER TABLE "subtask" ALTER COLUMN "taskId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "userUserId"`);
        await queryRunner.query(`ALTER TABLE "subtask" DROP COLUMN "taskTaskId"`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "taskTaskId" TO "taskId"`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_9fc19c95c33ef4d97d09b72ee95" FOREIGN KEY ("taskId") REFERENCES "task"("taskId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subtask" ADD CONSTRAINT "FK_8209040ec2c518c62c70cd382dd" FOREIGN KEY ("taskId") REFERENCES "task"("taskId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
