import express from 'express';
import cors from 'cors';
import questionsRouter from './routers/questionsRouter';
import studentRouter from './routers/studentRouter';
import ServerMiddlewareError from './error/ServerMiddlewareError';

const app = express();

app.use(cors());
app.use(express.json());

app.use(questionsRouter);
app.use(studentRouter);

app.use(ServerMiddlewareError);

export default app;
