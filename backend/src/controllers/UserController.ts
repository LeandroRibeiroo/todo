import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await userService.createUser(body);

    const response = {
      message: 'User created successfully.',
    };

    res.status(201).json(response);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { body, params } = req;

  const { userId } = params;

  try {
    if (!userId) {
      return res.status(400).json({ message: 'User id not provided.' });
    }

    const user = await userService.getUser(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    await userService.updateUser(userId, body);

    const response = {
      message: 'User updated successfully.',
    };

    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const {
    params: { userId },
  } = req;

  try {
    if (!userId) {
      return res.status(400).json({ message: 'User id not provided.' });
    }

    const user = await userService.getUser(userId);

    const response = {
      userId: user.userId,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      username: user.username,
      refreshToken: user.refreshToken,
      tasks: user.tasks,
    };

    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const {
    params: { userId },
  } = req;

  try {
    if (!userId) {
      return res.status(400).json({ message: 'User id not provided.' });
    }

    const user = await userService.getUser(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    await userService.deleteUser(userId);

    const response = {
      message: 'User deleted successfully.',
    };

    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
