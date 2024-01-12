import { Router } from 'express';
import {
  createTask,
  getAllTasksByUser,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/TaskController';

const router = Router();

router.post('/', createTask);
router.get('/:userId', getAllTasksByUser);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
