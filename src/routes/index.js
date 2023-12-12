import siteRoute from './SiteRoute.js';
import tourRoute from './TourRoute.js';
import courseRoute from './CourseRoute.js';
import errorRoute from './ErrorRoute.js';
import userRoute from './UserRoute.js';
import cartRoute from './CartRoute.js';
import adminRoute, { admin, } from '../admin/routers/index.js';

export default (app) => {
  app.use('/course', courseRoute);
  app.use('/tour', tourRoute);
  app.use('/user', userRoute);
  app.use('/cart', cartRoute);
  app.use(admin.options.rootPath, adminRoute);
  app.use('/', siteRoute);
  app.use('*', errorRoute);
}
