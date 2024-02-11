import { Router } from 'express';
import {
  createComment,
  deleteComment,
  updateComment,
} from '../controllers/CommentsController';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = Router();

router.post('/:taskId', authenticateToken, createComment);
router.put('/:commentId', authenticateToken, updateComment);
router.delete('/:commentId', authenticateToken, deleteComment);

export default router;
