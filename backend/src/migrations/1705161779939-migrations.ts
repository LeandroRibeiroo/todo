import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1705161779939 implements MigrationInterface {
    name = 'Migrations1705161779939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subtask" ("subtaskId" uuid NOT NULL DEFAULT uuid_generate_v4(), "subtaskTitle" character varying NOT NULL, "isSubtaskCompleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "taskTaskId" uuid, CONSTRAINT "PK_db3f9fe1ecdf82523d04b39c272" PRIMARY KEY ("subtaskId"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("commentId" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "taskTaskId" uuid, CONSTRAINT "PK_1b03586f7af11eac99f4fdbf012" PRIMARY KEY ("commentId"))`);
        await queryRunner.query(`CREATE TABLE "task" ("taskId" uuid NOT NULL DEFAULT uuid_generate_v4(), "taskTitle" character varying NOT NULL, "taskDescription" text NOT NULL, "isTaskCompleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_c5a68aa4b5c8d38a06f8e8d4c57" PRIMARY KEY ("taskId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "lastname" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`ALTER TABLE "subtask" ADD CONSTRAINT "FK_23898de3c7e1bc98290f7a6ef6d" FOREIGN KEY ("taskTaskId") REFERENCES "task"("taskId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_dc8cb2f0561bc6f09902a1dc88d" FOREIGN KEY ("taskTaskId") REFERENCES "task"("taskId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_dc8cb2f0561bc6f09902a1dc88d"`);
        await queryRunner.query(`ALTER TABLE "subtask" DROP CONSTRAINT "FK_23898de3c7e1bc98290f7a6ef6d"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "subtask"`);
    }

}
