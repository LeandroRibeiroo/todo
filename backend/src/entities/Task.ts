import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Subtask } from './Subtask';
import { Comment } from './Comment';
import { User } from './User';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  taskId: string;

  @Column()
  @IsNotEmpty()
  taskTitle: string;

  @Column('text')
  @IsOptional()
  taskDescription: string;

  @Column({ default: false })
  isTaskCompleted: boolean;

  @OneToMany(() => Subtask, (subtask) => subtask.task, {
    cascade: true,
    nullable: true,
  })
  subtasks: Subtask[];

  @OneToMany(() => Comment, (comment) => comment.task, {
    cascade: true,
    nullable: true,
  })
  comments: Comment[];

  @Column({ type: 'uuid' })
  @IsOptional()
  userId: string;
  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
