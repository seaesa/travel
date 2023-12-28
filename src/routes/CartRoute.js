import express from 'express';
const router = express.Router()
import asyncHandler from 'express-async-handler';
import cartController from '../controllers/CartController.js';
import { diffProduct, isGuest } from '../middleware/check.js'


router.post('/add/:id', asyncHandler(isGuest), asyncHandler(diffProduct), asyncHandler(cartController.add));
router.delete('/delete/:id', asyncHandler(cartController.remove));
router.get('/', asyncHandler(isGuest), asyncHandler(cartController.index));

export default router;
