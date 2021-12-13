/* eslint-disable use-isnan */
import { Request, Response } from 'express';
import BodyError from '../error/BodyError';
import ParamError from '../error/ParamError';
import QuestionError from '../error/QuestionError';
import * as questionsService from '../services/questionsService';

async function addQuestion(req: Request, res: Response, next: any) {
  const { question, student, studentClass, tags } = req.body;

  if (!question || !student || !studentClass || !tags) {
    return res.sendStatus(400);
  }
  try {
    const id = await questionsService.addNewQuestion({
      question,
      student,
      studentClass,
      tags,
    });
    return res.sendStatus(201).send(id);
  } catch (err) {
    if (err instanceof BodyError) {
      return res.sendStatus(400).send(err.message);
    }
    return next(err);
  }
}

async function getQuestion(req: Request, res: Response, next: any) {
  const { id } = req.params;
  if (!id) {
    return res.sendStatus(400);
  }
  try {
    const question = await questionsService.getQuestion(id);
    return res.send(question);
  } catch (err) {
    if (err instanceof ParamError) {
      return res.sendStatus(400);
    }
    if (err instanceof QuestionError) {
      return res.sendStatus(404);
    }
    return next(err);
  }
}

async function getNoAnsweredQuestions(req: Request, res: Response, next: any) {
  try {
    const questions = await questionsService.getNoAnsweredQuestions();
    return res.send(questions).status(200);
  } catch (err) {
    if (err instanceof QuestionError) {
      return res.sendStatus(404);
    }
    return next(err);
  }
}

export { addQuestion, getQuestion, getNoAnsweredQuestions };
