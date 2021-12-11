import { Request, Response } from 'express';
import BodyError from '../error/BodyError';
import * as questionsService from '../services/questionsService';

async function addQuestion(req: Request, res: Response, next: any) {
  const { question, student, studentClass, tags } = req.body;

  if (!question || !student || !studentClass || !tags) {
    return res.sendStatus(400);
  }
  try {
    await questionsService.addNewQuestion({
      question,
      student,
      studentClass,
      tags,
    });
    return res.sendStatus(200);
  } catch (err) {
    if (err instanceof BodyError) {
      return res.status(400).send(err.message);
    }
    return next(err);
  }
}

export { addQuestion };
