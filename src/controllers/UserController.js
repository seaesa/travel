import User from '../models/User.js';
import Course from '../models/Course.js';
import Tour from '../models/Tour.js';
import Stripe from 'stripe';
const endpointSecret = "whsec_6127f8ac47ac7c16d7d5475e685e8016a1e358524a799a14eca40ba523e79612";
// config payment
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || process.env.STRIPE_PUBLIC_KEY || `sk_test_51OFYQ5DvCO20FIDGJe0Ci5dUP2NGLoVcBSJl4VUI8Rj1oMitzJ1SOwIJczTKVRLDZqtS00UNMR9SqgNtvH6GrRDj00Id98l0ix`);

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
    const { id } = req.params;
    const course = await Course.findById({ _id: id }).lean();
    const tour = await Tour.findById({ _id: id }).lean();
    res.render('user/checkout', { id, tour, course });
  }
  async charge(req, res, next) {
    const { name, price } = req.entityProduct
    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.URL_WEBSITE}:${process.env.PORT}`,
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name },
          unit_amount: price
        },
        quantity: req.body.quantity
      }],
    });
    res.json({ url: session.url });
  }
  async buyed(req, res, next) {
    const ticket = await stripe.checkout.sessions.list({});
    res.json(ticket)
  }
}
