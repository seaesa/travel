// import admin
import Adminjs from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/mongoose';
// import modal
import { courseAdmin } from './course.admin.js';
import { tourAdmin } from './tour.admin.js';
import { userAdmin } from './user.admin.js';

// config database adminjs
Adminjs.registerAdapter({ Database, Resource })

// initialize admin view
const admin = new Adminjs({ resources: [userAdmin, courseAdmin, tourAdmin] });

// init router
const adminRouter = AdminJSExpress.buildRouter(admin);

export { adminRouter, admin };