import { Request, Response } from 'express';
import * as rankingService from '../services/rankingService';

async function getRanking(req: Request, res: Response, next: any) {
  try {
    const ranking = await rankingService.getRanking();
    return ranking;
  } catch (err) {
    return next(err);
  }
}

export { getRanking };
