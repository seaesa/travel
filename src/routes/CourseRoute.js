import express from 'express';
const router = express.Router();
import asyncHandler from 'express-async-handler';
import courseController from '../controllers/CourseController.js';
import { checkGuest } from '../middleware/handleAuth.js';


// get router
router.get('/:slug', asyncHandler(courseController.show))
router.delete('/delete/:id', asyncHandler(courseController.deleteCourseCart))
router.get('/add-to-cart/:id', checkGuest, asyncHandler(courseController.add))
router.get('/', asyncHandler(courseController.index))

export default router;