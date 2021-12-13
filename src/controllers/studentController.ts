import { Request, Response } from 'express';
import BodyError from '../error/BodyError';
import ParamError from '../error/ParamError';
import * as studentService from '../services/studentService';

async function createStudent(req: Request, res: Response, next: any) {
  const { name, class: studentClass } = req.body;
  if (!name || !studentClass) {
    return res.sendStatus(400);
  }
  try {
    const token = await studentService.createNewStudent({ name, studentClass });
    return res.send(token);
  } catch (err) {
    if (err instanceof ParamError) {
      return res.sendStatus(404);
    }
    if (err instanceof BodyError) {
      return res.sendStatus(400);
    }
    return next(err);
  }
}

export { createStudent };
