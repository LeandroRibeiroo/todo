import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Task } from './Task';

@Entity()
export class Subtask {
  @PrimaryGeneratedColumn('uuid')
  subtaskId: string;

  @Column()
  @IsNotEmpty()
  subtaskTitle: string;

  @Column({ default: false })
  isSubtaskCompleted: boolean = false;

  @Column({ type: 'uuid' })
  taskId: string;
  @ManyToOne(() => Task, (task) => task.subtasks)
  task: Task;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
