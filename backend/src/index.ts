import 'reflect-metadata';
import { AppDataSource } from './data-source';
import app from './app';

AppDataSource.initialize().then(async () => {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
  });
});
