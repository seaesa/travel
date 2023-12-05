import express from 'express';
const router = express.Router();
import asyncHandler from 'express-async-handler';
import errorController from '../controllers/ErrorController.js';

// get router
router.get('*', asyncHandler(errorController.error))

export default router;
