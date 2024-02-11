import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Task } from '../entities/Task';
import { Comment } from '../entities/Comment';
import { Subtask } from '../entities/Subtask';

export class TaskService {
  private taskRepository: Repository<Task>;
  private subtaskRepository: Repository<Subtask>;
  private commentRepository: Repository<Comment>;

  constructor() {
    this.taskRepository = AppDataSource.getRepository('Task');
    this.subtaskRepository = AppDataSource.getRepository('Subtask');
    this.commentRepository = AppDataSource.getRepository('Comment');
  }

  async createTask(taskData: Partial<Task>, userId: string) {
    const newTask = this.taskRepository.create(taskData);

    if (!newTask) {
      throw new Error('Task Service: Task could not be created.');
    }

    newTask.userId = userId;

    const savedTask = await this.taskRepository.save(newTask);

    if (!savedTask) {
      throw new Error('Task Service: Task could not be saved.');
    }

    return savedTask;
  }

  async getTasksByUserId(userId: string) {
    // Get all tasks by user id and return them in a DESC order by createdAt date
    // Also, include the subtasks and comments for each task in the response and
    // return them in a ASC order by createdAt date

    const tasks = await this.taskRepository.find({
      where: { userId },
      relations: ['subtasks', 'comments'],
      order: {
        createdAt: 'DESC',
        subtasks: {
          createdAt: 'ASC',
        },
        comments: {
          createdAt: 'ASC',
        },
      },
    });

    if (!tasks) {
      throw new Error('Task Service: Tasks could not be found.');
    }

    return tasks;
  }

  async getTask(taskId: string) {
    const task = await this.taskRepository.findOne({
      where: { taskId },
      relations: ['subtasks', 'comments'],
    });

    if (!task) {
      throw new Error('Task Service: Task could not be found.');
    }

    console.log('@getTask task:', task);

    return task;
  }

  async updateTask(taskId: string, taskData: Partial<Task>): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({
        where: { taskId },
      });

      if (!task) {
        throw new Error('Task Service: Task could not be found.');
      }

      const updatedTask = await this.taskRepository.save({
        ...task,
        ...taskData,
      });

      if (!updatedTask) {
        throw new Error('Task Service: Task could not be updated.');
      }

      return updatedTask;
    } catch (error: any) {
      throw new Error(`Task Service: An error occurred - ${error.message}`);
    }
  }

  async deleteTask(taskId: string) {
    const deletedTask = await this.taskRepository.delete({ taskId });

    if (!deletedTask) {
      throw new Error('Task Service: Task could not be deleted.');
    }

    return deletedTask;
  }
}
