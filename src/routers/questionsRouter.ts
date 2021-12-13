import { Router } from 'express';
import * as questionsController from '../controllers/questionsController';
import * as answerController from '../controllers/answerController';

const router = Router();

router.post('/questions', questionsController.addQuestion);

router.get('/questions/:id', questionsController.getQuestion);

router.post('/questions/:id', answerController.postAnswer);

router.get('/questions/', questionsController.getNoAnsweredQuestions);

export default router;
