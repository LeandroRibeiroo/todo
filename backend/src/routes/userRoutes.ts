import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from '../controllers/UserController';

const router = Router();

router.post('/', createUser);
router.put('/:id', updateUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);

export default router;
