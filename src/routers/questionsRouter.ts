import { Router } from 'express';
import * as questionsController from '../controllers/questionsController';

const router = Router();

router.post('/questions', questionsController.addQuestion);

export default router;
