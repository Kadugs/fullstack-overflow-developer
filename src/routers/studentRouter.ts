import { Router } from 'express';
import * as studentController from '../controllers/studentController';

const router = Router();

router.post('/users', studentController.createStudent);

export default router;
