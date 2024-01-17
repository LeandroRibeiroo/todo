import { Request, Response } from 'express';
import { SubtaskService } from '../services/SubtaskService';
import { TaskService } from '../services/TaskService';

const taskService = new TaskService();
const subtaskService = new SubtaskService();

export const createSubtask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { subtaskTitle, isSubtaskCompleted } = req.body;

    if (!taskId) {
      return res.status(400).json({ error: 'Task id not provided.' });
    }

    const subtask = await subtaskService.createSubtask(
      { subtaskTitle, isSubtaskCompleted },
      taskId,
    );

    const response = {
      subtaskId: subtask.subtaskId,
      subtaskTitle: subtask.subtaskTitle,
      subtaskCreatedAt: subtask.createdAt,
      subtaskUpdatedAt: subtask.updatedAt,
      isSubtaskCompleted: subtask.isSubtaskCompleted,
    };

    return res.json(response);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateSubtask = async (req: Request, res: Response) => {
  try {
    const { taskId, subtaskId } = req.params;
    const { subtaskTitle, isSubtaskCompleted } = req.body;

    if (!taskId) {
      return res.status(400).json({ error: 'Task id not provided.' });
    }

    if (!subtaskId) {
      return res.status(400).json({ error: 'Subtask id not provided.' });
    }

    const subtaskData = {
      subtaskTitle,
      isSubtaskCompleted,
    };

    await subtaskService.updateSubtask(subtaskId, subtaskData);

    const task = await taskService.getTask(taskId);

    return res.json(task);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteSubtask = async (req: Request, res: Response) => {
  try {
    const { taskId, subtaskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ error: 'Task id not provided.' });
    }

    if (!subtaskId) {
      return res.status(400).json({ error: 'Subtask id not provided.' });
    }

    await subtaskService.deleteSubtask(subtaskId);

    const task = await taskService.getTask(taskId);

    return res.json(task);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
