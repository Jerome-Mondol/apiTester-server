import express from 'express'
import { handleJWT } from '../controllers/jwt.controller.js';

const router = express.Router();

router.post('/', handleJWT);

export default router;
