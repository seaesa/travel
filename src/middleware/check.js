import User from '../models/User.js'
import Course from '../models/Course.js';
import Tour from '../models/Tour.js';
import Cart from '../models/Cart.js';

export const { sureGuest, isPresent, isGuest, isAdmin, diffProduct, isExist, idTest } = {
  sureGuest: async (req, res, next) => {
    if (req.isAuthenticated()) {
      res.locals.user = req.isAuthenticated();
      const userId = await User.findById(req.session.passport.user).lean()
      res.locals.product = await Cart.find({}).countDocuments({ userId: userId._id });
      res.locals.userId = userId;
      req.user = userId;
      return next();
    }
    else return next();
  },
  isPresent: async (req, res, next) => {
    if (req.session.passport?.user) {
      const { user } = req.session.passport;
      const isUser = await User.findById({ _id: user });
      if (!isUser) req.logout(() => res.redirect('/'));
      else return next();
    } else return next();
  },
  isGuest: async (req, res, next) => {
    if (req.isAuthenticated()) return next();
    else res.redirect('/user/login');
  },
  isAdmin: async (req, res, next) => {
    const role = await User.findById(req.session.passport.user).lean()
    if (role.role !== 'admin') res.render('error/permission', { layout: 'error' });
    else return next();
  },
  diffProduct: async (req, res, next) => {
    const { id } = req.params;
    const course = await Course.findById(id);
    const tour = await Tour.findById(id);
    if (course) {
      req.entityProduct = course;
      req.typeProduct = 'Course';
      return next();
    } else if (tour) {
      req.entityProduct = tour;
      req.typeProduct = 'Tour';
      return next();
    }
    return next();
  }
}