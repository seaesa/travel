import express from 'express';
const router = express.Router();
import asyncHandler from 'express-async-handler';
import tourController from '../controllers/TourController.js';
import { checkGuest } from '../middleware/handleAuth.js';

// get router
router.get('/:slug', asyncHandler(tourController.show))
router.get('/add-to-cart/:id', checkGuest, asyncHandler(tourController.add))
router.delete('/delete/:id', asyncHandler(tourController.deleteTourCart))
router.get('/', asyncHandler(tourController.index))

export default router;
