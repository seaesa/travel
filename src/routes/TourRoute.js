import express from 'express';
const router = express.Router();
import asyncHandler from 'express-async-handler';
import tourController from '../controllers/TourController.js';
import { isGuest } from '../middleware/check.js';
// get router
router.get('/:slug', asyncHandler(tourController.show))
router.get('/', asyncHandler(tourController.index))

export default router;
