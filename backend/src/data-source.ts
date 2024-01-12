import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { resolve } from 'path';
import { Task } from './entities/Task';
import { Comment } from './entities/Comment';
import { Subtask } from './entities/Subtask';
import { User } from './entities/User';

config({ path: resolve(__dirname, '.env.local') });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [User, Task, Subtask, Comment],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Database initialized.');
  })
  .catch((error) => {
    console.error('Error initializing database: ', error);
  });
