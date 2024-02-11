import { Router } from 'express';
import {
  createTask,
  getAllTasksByUser,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/TaskController';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = Router();

router.post('/:userId', authenticateToken, createTask);
router.get('/', authenticateToken, getAllTasksByUser);
router.get('/task/:taskId', authenticateToken, getTaskById);
router.put('/task/:taskId', authenticateToken, updateTask);
router.delete('/task/:taskId', authenticateToken, deleteTask);

export default router;
