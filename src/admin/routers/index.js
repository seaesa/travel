import express from 'express';
const router = express.Router();
import { isAdmin, isGuest } from '../../middleware/check.js';
import asyncHandler from 'express-async-handler'
// import module adminjs
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';

// import components
import { tourAdmin } from '../components/tour.admin.js';
import { courseAdmin } from '../components/course.admin.js';
import { userAdmin } from '../components/user.admin.js';

// config database
AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
})

export const admin = new AdminJS({ resources: [userAdmin, tourAdmin, courseAdmin] });
export const adminRouter = AdminJSExpress.buildRouter(admin);

// get router
router.use('/', asyncHandler(isGuest), asyncHandler(isAdmin), adminRouter)

export default router;