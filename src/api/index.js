import { Router } from 'express';
import { authenticateApiRequest } from '../middlewares.js';

const router = Router();

router.get('/', authenticateApiRequest, (req, res) => {
  res.json({
    message: 'API is up.',
  });
});

export default router;
