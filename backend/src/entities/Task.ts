import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Subtask } from './Subtask';
import { Comment } from './Comment';
import { User } from './User';

@Entity()
export class Task {
  @PrimaryColumn('uuid')
  taskId: string = '';

  @Column()
  taskTitle: string = '';

  @Column('text')
  taskDescription: string = '';

  @Column({ default: false })
  isTaskCompleted: boolean = false;

  @OneToMany(() => Subtask, (subtask) => subtask.task, {
    cascade: true,
  })
  subtasks: Subtask[] | undefined;

  @OneToMany(() => Comment, (comment) => comment.task, {
    cascade: true,
  })
  comments: Comment[] | undefined;

  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User | undefined;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
