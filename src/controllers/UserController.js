import User from '../models/User.js';
import Stripe from 'stripe';
import Course from '../models/Course.js';
import Tour from '../models/Tour.js';

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
    await User.findOneAndUpdate({ _id: req.params.id }, {
      username, email, address, phone, slug: `@${username}`,
      data: buffer,
      contentType
    });
    const user = await User.findOne({ username })
    if (user)
      res.redirect(`/${user.slug}`)
    else res.send(`error`);
  }
  async checkout(req, res, next) {
    const course = await Course.findById({ _id: req.params.id }).lean();
    const tour = await Tour.findById({ _id: req.params.id }).lean();
    console.log(course)
    console.log(tour)
    res.render('user/checkout', { course, tour });
  }
  async charge(req, res, next) {
    const { name, card_number, date, cvv } = req.body;
    // const stripe = new Stripe(`sk_test_51OFYQ5DvCO20FIDGJe0Ci5dUP2NGLoVcBSJl4VUI8Rj1oMitzJ1SOwIJczTKVRLDZqtS00UNMR9SqgNtvH6GrRDj00Id98l0ix`);
    // const customer = await stripe.customers.create({
    //   currency:'usd',

    // })
    // console.log(customer)
    res.end(`success`)
  }
}
