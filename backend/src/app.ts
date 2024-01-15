import express, { Application } from 'express';
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';
import loginRouter from './routes/authRoutes';

const app: Application = express();

app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/user', userRoutes);
app.use('/login', loginRouter);

export default app;
