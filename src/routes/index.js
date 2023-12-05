import siteRoute from './SiteRoute.js';
import tourRoute from './TourRoute.js';
import courseRoute from './CourseRoute.js';
import errorRoute from './ErrorRoute.js';
import userRoute from './UserRoute.js';
import { admin, adminRouter } from '../admin/adminjs.js';
import { isAdmin, checkGuest } from '../middleware/handleAuth.js'

export default (app) => {
  //admin route adminjs
  app.use(admin.options.rootPath, checkGuest, isAdmin, adminRouter)
  // define route
  app.use('/course', courseRoute);
  app.use('/tour', tourRoute);
  app.use('/user', userRoute);
  app.use('/', siteRoute);
  app.use('*', errorRoute);
}
