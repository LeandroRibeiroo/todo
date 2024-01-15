import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const newUser = await userService.createUser(body);

    res.status(201).json(newUser);
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

    const updatedUser = await userService.updateUser(userId, body);

    res.status(200).json(updatedUser);
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

    res.status(200).json(user);
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

    const deletedUser = await userService.deleteUser(userId);

    res.status(200).json(deletedUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
