import User from '../models/User.js'
const handleAuth = {
  sureGuest: async (req, res, next) => {
    if (req.isAuthenticated()) {
      res.locals.user = req.isAuthenticated();
      res.locals.session = req.session;
      const userId = await User.findById(req.session.passport.user).lean()
      res.locals.userId = userId;
      return next();
    }
    else return next();
  },
  checkGuest: async (req, res, next) => {
    if (req.isAuthenticated()) return next();
    else res.redirect('/user/login');
  },
  isAdmin: async (req, res, next) => {
    const role = await User.findById(req.session.passport.user).lean()
    if (role.role !== 'admin') res.render('error/error', { layout: 'error' });
    else return next();
  },
  authenLogin: passport => passport.authenticate('locals.login', { failureRedirect: '/user/login' }),
  authenSignup: passport => passport.authenticate('locals.signup', { failureRedirect: '/user/signup' }),
  authenProfile: passport => passport.authenticate('locals.profile', { failureRedirect: 'back' })

}
export const { sureGuest, checkGuest, authenLogin, authenSignup, authenProfile, isAdmin } = handleAuth