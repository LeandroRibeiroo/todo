import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';
import { UserService } from '../services/UserService';

const taskService = new TaskService();
const userService = new UserService();

export const createTask = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { taskTitle, taskDescription } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User id not provided.' });
    }

    const user = await userService.getUser(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const task = await taskService.createTask(
      { taskTitle, taskDescription },
      user,
    );

    const response = {
      taskId: task.taskId,
      taskTitle: task.taskTitle,
      taskDescription: task.taskDescription,
      taskCreatedAt: task.createdAt,
      taskUpdatedAt: task.updatedAt,
      subtasks: task.subtasks,
      comments: task.comments,
    };

    return res.json(response);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllTasksByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ error: 'User id not provided.' });
    }

    const user = await userService.getUser(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const tasks = await taskService.getTasksByUserId(userId);

    const response = tasks.map((task) => ({
      taskId: task.taskId,
      taskTitle: task.taskTitle,
      taskDescription: task.taskDescription,
      taskCreatedAt: task.createdAt,
      taskUpdatedAt: task.updatedAt,
      subtasks: task.subtasks,
      comments: task.comments,
    }));

    return res.json(response);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  const { taskId } = req.params;

  try {
    if (!taskId) {
      return res.status(400).json({ error: 'Task id not provided.' });
    }

    const task = await taskService.getTask(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    const response = {
      taskId: task.taskId,
      taskTitle: task.taskTitle,
      taskDescription: task.taskDescription,
      taskCreatedAt: task.createdAt,
      taskUpdatedAt: task.updatedAt,
      subtasks: task.subtasks,
      comments: task.comments,
    };

    return res.json(response);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;

  try {
    if (!taskId) {
      return res.status(400).json({ error: 'Task id not provided.' });
    }

    const task = await taskService.getTask(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    const updatedTask = await taskService.updateTask(taskId, req.body);

    const response = {
      taskId: updatedTask.taskId,
      taskTitle: updatedTask.taskTitle,
      taskDescription: updatedTask.taskDescription,
      taskCreatedAt: updatedTask.createdAt,
      taskUpdatedAt: updatedTask.updatedAt,
      subtasks: updatedTask.subtasks,
      comments: updatedTask.comments,
    };

    return res.json(response);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;

  try {
    if (!taskId) {
      return res.status(400).json({ error: 'Task id not provided.' });
    }

    const task = await taskService.getTask(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    await taskService.deleteTask(taskId);

    return res.json({ message: 'Task deleted.' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
