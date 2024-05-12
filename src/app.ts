import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cardsRouter from './routes/cards';
import usersRouter from './routes/users';
import { ERORR_NOT_FOUND, sendError } from './utils/errors';

const { PORT = 3555 } = process.env;

const app = express();

app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  // используем данное место по согласованию с преподователем
  // https://app.pachca.com/chats?thread_id=3605212&sidebar_message=242177553
  res.locals.user = {
    _id: '663cd9e271430f97205b09f1',
  };

  next();
});

app.use(usersRouter);
app.use(cardsRouter);
app.use('*', (req, res) => sendError(res, ERORR_NOT_FOUND));

mongoose.connect('mongodb://localhost:27017/mestodb');

const bootstrap = async () => {
  try {
    await app.listen(PORT);
    console.log(`App listening on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
};

bootstrap();
