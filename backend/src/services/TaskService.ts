import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { Task } from '../entities/Task';

export class TaskService {
  private taskRepository: Repository<Task>;

  constructor() {
    this.taskRepository = AppDataSource.getRepository('Task');
  }

  async createTask(taskData: Partial<Task>, user: User) {
    const newTask = this.taskRepository.create(taskData);

    if (!newTask) {
      throw new Error('Task Service: Task could not be created.');
    }

    newTask.user = user;

    const savedTask = await this.taskRepository.save(newTask);

    if (!savedTask) {
      throw new Error('Task Service: Task could not be saved.');
    }

    return savedTask;
  }

  async getTasksByUserId(userId: string) {
    const tasks = await this.taskRepository.findBy({ user: { userId } });

    if (!tasks) {
      throw new Error('Task Service: Tasks could not be found.');
    }

    return tasks;
  }

  async getTask(taskId: string) {
    const task = await this.taskRepository.findOneBy({ taskId });

    if (!task) {
      throw new Error('Task Service: Task could not be found.');
    }

    return task;
  }

  async updateTask(taskId: string, taskData: Partial<Task>) {
    const updatedTask = this.taskRepository.update({ taskId }, taskData);

    if (!updatedTask) {
      throw new Error('Task Service: Task could not be updated.');
    }

    return updatedTask;
  }

  async deleteTask(taskId: string) {
    const deletedTask = await this.taskRepository.delete({ taskId });

    if (!deletedTask) {
      throw new Error('Task Service: Task could not be deleted.');
    }

    return deletedTask;
  }
}
