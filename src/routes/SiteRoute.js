import express from 'express'
const router = express.Router();
import SiteController from '../controllers/SiteController.js';
import asyncHandler from 'express-async-handler';
import { checkGuest } from '../middleware/handleAuth.js';
router.get('/', asyncHandler(SiteController.index))
router.get('/forums', asyncHandler(SiteController.forums))
router.get('/profile', asyncHandler(SiteController.profile))
router.get('/contact', asyncHandler(SiteController.contact))

// list cart
router.get('/cart', checkGuest, asyncHandler(SiteController.showCart))




//@desc get user name
// route user
router.get('/@:username', checkGuest, SiteController.user)



//test admin
// router.get('/admin', asyncHandler(SiteController.admin))
// router.post('/admin/route', asyncHandler(SiteController.createCourse))
// router.post('/admin', asyncHandler(SiteController.createTour));

export default router;
