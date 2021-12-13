import { Request, Response } from 'express';
import BodyError from '../error/BodyError';
import AuthError from '../error/AuthError';
import ParamError from '../error/ParamError';
import * as answerService from '../services/answerService';

async function postAnswer(req: Request, res: Response, next: any) {
  const { id } = req.params;
  const { answer } = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!id || !answer) {
    return res.sendStatus(400);
  }
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    await answerService.postAnswer({ id, answer, token });
    return res.sendStatus(201);
  } catch (err) {
    if (err instanceof BodyError) {
      return res.sendStatus(400);
    }
    if (err instanceof AuthError) {
      return res.sendStatus(401);
    }
    if (err instanceof ParamError) {
      return res.sendStatus(404);
    }
    return next(err);
  }
}

export { postAnswer };
