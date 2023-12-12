import Tour from '../models/Tour.js';
import Course from '../models/Course.js';
import User from '../models/User.js';
import TourCart from '../models/Cart.js';
import CourseCart from '../models/Cart.js';

export default new class SiteController {
  async index(req, res, next) {
    const course = await Course.find({}).sort('-createdAt').lean()
    const tour = await Tour.find({}).sort('-createdAt').lean()
    res.render(`index`, { layout: 'home', tour, course });
  }
  forums(req, res, next) {
    res.render(`forums`);
  }
  profile(req, res, next) {
    res.render(`profile`);
  }
  contact(req, res, next) {
    res.render(`contact`);
  }
  //user
  async user(req, res, next) {
    const user = await User.findOne({ username: req.params.username }).lean();
    if (!user) return next();
    const error = req.flash().error;
    if (error)
      for (let item of error) {
        const { name, mail, username, email, address, phone } = item;
        res.render(`user/profile`, { user, name, mail, username, email, address, phone });
      }
    else res.render(`user/profile`, { user });
  }
}
