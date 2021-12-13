import { Router } from 'express';
import * as tagsController from '../controllers/tagsController';

const router = Router();

router.get('/tags', tagsController.getTags);

router.post('/tags', tagsController.postTag);

export default router;
