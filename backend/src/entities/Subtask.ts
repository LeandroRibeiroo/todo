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
export class Subtask {
  @PrimaryColumn('uuid')
  subtaskId: string = '';

  @Column()
  subtaskTitle: string = '';

  @Column({ default: false })
  isSubtaskCompleted: boolean = false;

  @ManyToOne(() => Task, (task) => task.subtasks)
  task: Task = new Task();

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
