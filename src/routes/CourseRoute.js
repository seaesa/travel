import express from 'express';
const router = express.Router();
import asyncHandler from 'express-async-handler';
import courseController from '../controllers/CourseController.js';
import { isGuest } from '../middleware/check.js';

// get router
router.get('/:slug', asyncHandler(courseController.show))
router.get('/', asyncHandler(courseController.index))

export default router;