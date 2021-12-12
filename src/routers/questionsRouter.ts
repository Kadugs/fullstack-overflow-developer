import { Router } from 'express';
import * as questionsController from '../controllers/questionsController';

const router = Router();

router.post('/questions', questionsController.addQuestion);
router.get('/questions/:id', questionsController.getQuestion);

export default router;
