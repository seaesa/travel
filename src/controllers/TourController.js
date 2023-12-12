import Tour from '../models/Tour.js';
import TourCart from '../models/Cart.js';
export default new class TourController {
  async index(req, res, next) {
    const tour = await Tour.find({}).lean()
    res.render(`tour/index`, { tour });
  }
  async show(req, res, next) {
    const tour = await Tour.findOne({ slug: req.params.slug }).lean();
    if(!tour) return next();
    const tourAll = await Tour.find({}).lean();
    res.render(`tour/show`, { tour, tourAll });
  }
}
