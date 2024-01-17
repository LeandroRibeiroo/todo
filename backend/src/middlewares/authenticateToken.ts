import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

export const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET ?? '', (err) => {
    if (err) {
      return res.sendStatus(403);
    }

    next();
  });
};
