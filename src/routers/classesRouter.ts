import { Router } from 'express';
import * as classesController from '../controllers/classesController';

const router = Router();

router.get('/classes', classesController.getClasses);

router.post('/classes', classesController.postClass);

export default router;
