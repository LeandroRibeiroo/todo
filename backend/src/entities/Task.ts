import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
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
  @JoinColumn({ name: 'taskId' })
  subtasks: Subtask[];

  @OneToMany(() => Comment, (comment) => comment.task, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn({ name: 'taskId' })
  comments: Comment[];

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
