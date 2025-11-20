import express from 'express'
import handleProxy from '../controllers/proxy.controller.js'

const router = express.Router();

router.post('/', handleProxy)

export default router;