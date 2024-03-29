import { Router } from 'express';
import {
  createSubtask,
  updateSubtask,
  deleteSubtask,
} from '../controllers/SubtaskController';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = Router();

router.post('/:taskId', authenticateToken, createSubtask);
router.put('/:subtaskId', authenticateToken, updateSubtask);
router.delete('/:subtaskId', authenticateToken, deleteSubtask);

export default router;
