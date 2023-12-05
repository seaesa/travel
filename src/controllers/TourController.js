import Tour from '../models/Tour.js';
import TourCart from '../models/Cart.js';
export default new class TourController {
  async index(req, res, next) {
    const tour = await Tour.find({}).lean()
    res.render(`tour/index`, { tour });
  }
  async show(req, res, next) {
    const tourAll = await Tour.find({}).lean()
    const tour = await Tour.findOne({ slug: req.params.slug }).lean()
    res.render(`tour/show`, { tour, tourAll });
  }
  async add(req, res, next) {
    const { quantity } = req.query;
    const tour = new TourCart(req.session.tour ? req.session.tour : {})
    const tourId = await Tour.findById(req.params.id);
    tour.add(tourId, tourId.id, quantity);
    req.session.tour = tour;
    res.redirect('back');
  }
  async deleteTourCart(req, res, next) {
    if (!req.session.tour) res.redirect('/cart')
    const tour = new TourCart(req.session.tour);
    let ids = req.params.id;
    tour.remove(ids);
    req.session.tour = tour;
    res.redirect('back');
  }
}
