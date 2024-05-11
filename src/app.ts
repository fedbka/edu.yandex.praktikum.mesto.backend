import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import authWare from './middlewares/authware';
import errorWare from './middlewares/errorware';
import { errorLogger, requestLogger } from './middlewares/logware';
import authRouter from './routes/auth';
import cardsRouter from './routes/cards';
import notFoundRouter from './routes/notfound';
import usersRouter from './routes/users';

const { PORT = 3555, MONGODB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();

app.use(requestLogger);
app.use(helmet());
app.use(express.json());
app.use(authRouter);
app.use(authWare);
app.use(usersRouter);
app.use(cardsRouter);
app.use(notFoundRouter);
app.use(errorLogger);
app.use(errorWare);

async function bootstrap() {
  try {
    await mongoose.connect(MONGODB_URL);
    await app.listen(PORT);
    console.log(`App listening on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
