import express from 'express';
import cors from 'cors';
import questionsRouter from './routers/questionsRouter';
import ServerMiddlewareError from './error/ServerMiddlewareError';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/questions', questionsRouter);

app.use(ServerMiddlewareError);

export default app;
