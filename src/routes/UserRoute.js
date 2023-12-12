import express from 'express';
const router = express.Router()
import asyncHandler from 'express-async-handler';
import passport from 'passport';
import userController from '../controllers/UserController.js';
import { authenLogin, authenSignup, authenProfile } from '../middleware/handleAuth.js';
import { isGuest, diffProduct } from '../middleware/check.js';
// fetch upload
import { upload } from '../config/multer.js';


//@desc login/signup
// POST [login,signup,logout]
router.route('/login')
  .get(asyncHandler(userController.login))
  .post(authenLogin(passport), asyncHandler(userController.verifyToken))
router.route('/signup')
  .get(asyncHandler(userController.signup))
  .post(authenSignup(passport), asyncHandler(userController.verifySignup))
router.delete('/logout', asyncHandler(userController.logout))

// change profile
router.patch('/profile/:id', upload.single('image'), authenProfile(passport), asyncHandler(userController.changeProfile))
router.route('/checkout/:id')
  .get(isGuest, asyncHandler(userController.checkout))
  .post(isGuest, diffProduct, asyncHandler(userController.charge))

router.post('/webhook', asyncHandler(userController.test))
export default router;
