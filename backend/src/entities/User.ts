import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { Task } from './Task';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: string = '';

  @Column()
  name: string = '';

  @Column()
  lastname: string = '';

  @Column()
  username: string = '';

  @Column({ unique: true })
  email: string = '';

  @Column()
  password: string = '';

  @OneToMany(() => Task, (task) => task.user, {
    cascade: true,
  })
  tasks: Task[] | undefined;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
