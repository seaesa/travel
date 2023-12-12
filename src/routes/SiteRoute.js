import express from 'express'
const router = express.Router();
import SiteController from '../controllers/SiteController.js';
import asyncHandler from 'express-async-handler';
import { isGuest, } from '../middleware/check.js';
router.get('/', asyncHandler(SiteController.index))
router.get('/forums', asyncHandler(SiteController.forums))
router.get('/profile', asyncHandler(SiteController.profile))
router.get('/contact', asyncHandler(SiteController.contact))


//@desc get user name
// route user
router.get('/@:username', isGuest, SiteController.user)

export default router;
