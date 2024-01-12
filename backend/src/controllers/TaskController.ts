import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';

export const createTask = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { taskTitle, taskDescription } = req.body;

    const user = await AppDataSource.getRepository('User').findOneBy({
      userId,
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const task = await AppDataSource.getRepository('Task').create({
      taskTitle,
      taskDescription,
      user,
    });

    await AppDataSource.getRepository('Task').save(task);

    return res.json(task);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllTasksByUser = async (req: Request, res: Response) => {
  try {
    const tasks = await AppDataSource.getRepository('Task').findBy({
      user: req.params.userId,
    });

    return res.json(tasks);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await AppDataSource.getRepository('Task').findOneBy({
      taskId: req.params.id,
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    return res.json(task);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await AppDataSource.getRepository('Task').findOneBy({
      taskId: req.params.id,
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    const updatedTask = await AppDataSource.getRepository('Task').update(
      task,
      req.body,
    );

    return res.json(updatedTask);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await AppDataSource.getRepository('Task').findOneBy({
      taskId: req.params.id,
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    await AppDataSource.getRepository('Task').delete(task);

    return res.json({ message: 'Task deleted.' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
