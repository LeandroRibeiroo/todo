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

  try {
    const updatedUser = await userService.updateUser(params.id, body);

    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { params } = req;

  try {
    const user = await userService.getUser(params.id);

    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { params } = req;

  try {
    const deletedUser = await userService.deleteUser(params.id);

    res.status(200).json(deletedUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
