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
  admin(req, res, next) {
    res.render(`admin`);
  }
  async createTour(req, res, next) {
    await Tour.create(req.body);
    res.redirect('/')
  }
  async createCourse(req, res, next) {
    console.log(`success`)
    await Course.create(req.body);
    res.redirect('/')
  }
  // show cart
  async showCart(req, res, next) {
    let tour, course;
    if (req.session.tour) {
      const tours = new TourCart(req.session.tour);
      tour = tours.generate();
    }
    if (req.session.course) {
      const courses = new CourseCart(req.session.course);
      course = courses.generate();
    }
    res.render(`cart/cart`, { tour, course });
  }
  //user
  async user(req, res, next) {
    const user = await User.findOne({ username: req.params.username }).lean();
    if (!user) res.render(`error/error`, { layout: `error` });
    const error = req.flash().error
    if (error)
      for (let item of error) {
        const { name, mail } = item;
        res.render(`user/profile`, { user, name, mail });
      }
    else res.render(`user/profile`, { user });
  }
}
