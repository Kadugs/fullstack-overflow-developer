import { Request, Response } from 'express';
import ConflictError from '../error/ConflictError';
import * as classesService from '../services/classesService';

async function postClass(req: Request, res: Response, next: any) {
  const { class: newClass } = req.body;
  if (!newClass) {
    return res.sendStatus(400);
  }
  try {
    const id = await classesService.postClass(newClass);
    if (!id) {
      return res.sendStatus(400);
    }
    return res.sendStatus(201);
  } catch (err) {
    if (err instanceof ConflictError) {
      return res.sendStatus(404);
    }
    return next(err);
  }
}
async function getClasses(req: Request, res: Response, next: any) {
  try {
    const classList = await classesService.getClasses();
    return res.send(classList);
  } catch (err) {
    return next(err);
  }
}

export { postClass, getClasses };
