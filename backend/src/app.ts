import express, { Application } from 'express';
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';
import loginRouter from './routes/authRoutes';
import subtaskRoutes from './routes/subtaskRoutes';
import commentsRoutes from './routes/commentsRoutes';

const app: Application = express();

app.use(express.json());

app.use('/user', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/login', loginRouter);
app.use('/subtasks', subtaskRoutes);
app.use('/comments', commentsRoutes);

export default app;
