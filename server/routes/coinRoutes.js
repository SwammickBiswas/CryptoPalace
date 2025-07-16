import express from 'express';
import { getCoins } from '../controllers/coinsController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const coinRouter = express.Router();

coinRouter.get('/', authenticate, getCoins);

export default coinRouter;
