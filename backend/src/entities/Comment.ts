import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { Task } from './Task';

@Entity()
export class Comment {
  @PrimaryColumn('uuid')
  commentId: string = '';

  @Column('text')
  content: string = '';

  @ManyToOne(() => Task, (task) => task.comments)
  task: Task = new Task();

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
