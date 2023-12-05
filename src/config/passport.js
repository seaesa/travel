import LocalStrategy from 'passport-local';
LocalStrategy.Strategy
import bcrypt from 'bcrypt';
import User from '../models/User.js';

export default (passport) => {
  passport.use('locals.login', new LocalStrategy({
    passReqToCallback: true
  }, async (req, username, password, cb) => {
    const user = await User.findOne({ username });
    if (!user)
      return cb(null, false, req.flash('error', { ...req.body, name: { message: 'Tên người dùng không tồn tại' } }));
    if (!(user.email === req.body.email))
      return cb(null, false, req.flash('error', { ...req.body, mail: { message: 'Email không tồn tại' } }));
    if (!(await bcrypt.compare(password, user.password)))
      return cb(null, false, req.flash('error', { ...req.body, pass: { message: 'Mật khẩu không chính xác' } }));
    return cb(null, user)
  }));

  passport.use('locals.signup', new LocalStrategy({
    passReqToCallback: true
  }, async (req, username, password, cb) => {
    if (await User.findOne({ username }))
      return cb(null, false, req.flash('error', { ...req.body, name: { message: 'Tên người dùng đã tồn tại' } }));
    if (await User.findOne({ email: req.body.email }))
      return cb(null, false, req.flash('error', { ...req.body, mail: { message: 'email đã tồn tại' } }));
    const pass = password === req.body.confirmpassword;
    if (!pass) return cb(null, false, req.flash('error', { ...req.body, pass: { message: 'mật khẩu không trùng khớp' } }));
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ ...req.body, password: hash });
    return cb(null, user);
  }));
  passport.use('locals.profile', new LocalStrategy({
    passwordField: 'email',
    passReqToCallback: true
  }, async (req, username, email, cb) => {
    const user = await User.findOne({ _id: req.params.id });
    const isUsername = await User.find({ $and: [{ _id: { $ne: user._id } }, { username }] })
    const isEmail = await User.find({ $and: [{ _id: { $ne: user._id } }, { email }] })
    if (isUsername.length)
      return cb(null, false, req.flash('error', { ...req.body, name: { message: 'Tên người dùng đã tồn tại' } }));
    if (isEmail.length)
      return cb(null, false, req.flash('error', { ...req.body, mail: { message: 'email đã tồn tại' } }));
    if (user) return cb(null, user)
    else return cb(null, false)
  }));
  passport.serializeUser((user, cb) => cb(null, user.id));
  passport.deserializeUser(async (id, cb) => cb(null, User.findById(id)));
}