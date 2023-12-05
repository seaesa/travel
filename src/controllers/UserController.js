import jwt from 'jsonwebtoken';
import User from '../models/User.js'
export default new class UserController {
  // handle login
  async login(req, res, next) {
    if (req.isAuthenticated()) res.redirect('/');
    const error = req.flash().error
    if (error)
      for (let item of error) {
        const { username, email, password, ...mess } = item;
        res.render(`form/login`, { username, email, password, mess })
      }
    else res.render(`form/login`)
  }
  //handle singup
  async signup(req, res, next) {
    if (req.isAuthenticated()) res.redirect('/');
    const error = req.flash().error
    if (error)
      for (let item of error) {
        const { username, email, password, confirmpassword, ...mess } = item;
        res.render(`form/signup`, { username, email, password, confirmpassword, mess })
      } else
      res.render(`form/signup`)
  }
  // logout
  async logout(req, res, next) {
    req.logout(() => res.redirect('/'));
  }

  // verify token

  async verifyToken(req, res, next) {
    const accessToken = jwt.sign({ user: { ...req.body } }, process.env.TOKEN_SECERT, { expiresIn: '1d' });
    // const token = req.headers.authorization || req.headers.Authorization;
    res.redirect('/')
  }
  async verifySignup(req, res, next) {
    res.redirect('/')
  }
  async changeProfile(req, res, next) {
    let buffer, contentType;
    if (req.file) {
      buffer = req.file.buffer;
      contentType = req.file.mimetype;
    }
    const { username, email, address, phone } = req.body;
    const user = await User.findOneAndUpdate({ username, email }, {
      username, email, address, phone,
      data: buffer,
      contentType
    })
    if (!user) res.send(`error`);
    res.redirect(`/@${user.username}`)
  }

}
