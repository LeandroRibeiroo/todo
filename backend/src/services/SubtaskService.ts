import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Subtask } from '../entities/Subtask';
import { TaskService } from './TaskService';

const taskService = new TaskService();

export class SubtaskService {
  private subtaskRepository: Repository<Subtask>;

  constructor() {
    this.subtaskRepository = AppDataSource.getRepository('Subtask');
  }

  async createSubtask(subtaskData: Partial<Subtask>, taskId: string) {
    try {
      const task = await taskService.getTask(taskId);

      if (!task) {
        throw new Error('Subtask Service: Task could not be found.');
      }

      const newSubtask = this.subtaskRepository.create({
        ...subtaskData,
        taskId,
      });

      if (!newSubtask) {
        throw new Error('Subtask Service: Subtask could not be created.');
      }

      const savedSubtask = await this.subtaskRepository.save(newSubtask);

      if (!savedSubtask) {
        throw new Error('Subtask Service: Subtask could not be saved.');
      }

      if (!task.subtasks) {
        task.subtasks = [];
      }

      task.subtasks.push(savedSubtask);

      const savedTask = await taskService.updateTask(taskId, task);

      if (!savedTask) {
        throw new Error('Subtask Service: Task could not be saved.');
      }

      return savedSubtask;
    } catch (error: any) {
      throw new Error(`Subtask Service: An error occurred - ${error.message}`);
    }
  }

  async updateSubtask(subtaskId: string, subtaskData: Partial<Subtask>) {
    const subtask = await this.subtaskRepository.findOne({
      where: { subtaskId },
    });

    if (!subtask) {
      throw new Error('Subtask Service: Subtask could not be found.');
    }

    const updatedSubtask = await this.subtaskRepository.save({
      ...subtask,
      ...subtaskData,
    });

    if (!updatedSubtask) {
      throw new Error('Subtask Service: Subtask could not be updated.');
    }

    return updatedSubtask;
  }

  async deleteSubtask(subtaskId: string) {
    const subtask = await this.subtaskRepository.findOne({
      where: { subtaskId },
    });

    if (!subtask) {
      throw new Error('Subtask Service: Subtask could not be found.');
    }

    const deletedSubtask = await this.subtaskRepository.delete(subtaskId);

    if (!deletedSubtask) {
      throw new Error('Subtask Service: Subtask could not be deleted.');
    }

    return deletedSubtask;
  }
}
