import { Request, Response } from 'express';
import ConflictError from '../error/ConflictError';
import * as tagsService from '../services/tagsService';

async function postTag(req: Request, res: Response, next: any) {
  const { tag } = req.body;
  if (!tag) {
    return res.sendStatus(400);
  }
  try {
    const id = await tagsService.postTag(tag);
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
async function getTags(req: Request, res: Response, next: any) {
  try {
    const tagList = await tagsService.getTags();
    return res.send(tagList);
  } catch (err) {
    return next(err);
  }
}

export { postTag, getTags };
