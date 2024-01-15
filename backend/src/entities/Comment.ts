import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from './Task';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  commentId: string;

  @Column('text')
  @IsNotEmpty()
  content: string;

  @ManyToOne(() => Task, (task) => task.comments)
  task: Task = new Task();

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
