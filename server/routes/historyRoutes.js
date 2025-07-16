import express from 'express';
import { saveHistorySnapshot, getCoinHistory } from '../controllers/historyController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const historyRouter = express.Router();

historyRouter.post('/', authenticate, saveHistorySnapshot);

historyRouter.get('/:coinId', authenticate, getCoinHistory);

export default historyRouter;
