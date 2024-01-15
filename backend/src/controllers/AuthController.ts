import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

const authService = new AuthService();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);

    return res.json(token);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
