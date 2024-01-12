import express, { Application } from 'express';
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';

const app: Application = express();

app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/user', userRoutes);

export default app;
