import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from '../controllers/UserController';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = Router();

router.post('/', createUser);
router.put('/:userId', authenticateToken, updateUser);
router.get('/:userId', authenticateToken, getUser);
router.delete('/:userId', authenticateToken, deleteUser);

export default router;
