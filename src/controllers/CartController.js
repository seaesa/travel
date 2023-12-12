import User from '../models/User.js';
import Course from '../models/Course.js';
import Tour from '../models/Tour.js';
import Cart from '../models/Cart.js';
export default new class UserController {
  //@desc add to cart
  //@route /cart/add/:id
  // show cart
  async index(req, res) {
    const course = await Cart.find({ typeProduct: 'Course', userId: req.user._id }).lean();
    const tour = await Cart.find({ typeProduct: 'Tour', userId: req.user._id }).lean();
    res.render(`cart/cart`, { course, tour });
  }
  async add(req, res) {
    const { name, image, price, description, _id, slug } = req.entityProduct;
    const { typeProduct } = req;
    const { quantity } = req.body;

    const updateCart = await Cart.findOneAndUpdate({ productId: _id }, { quantity });
    if (!updateCart) {
     await Cart.create({
        name,
        image,
        price,
        description,
        quantity,
        typeProduct,
        userId: req.session.passport.user,
        productId: _id,
        slug
      })
    }
    res.redirect('back');
  }
  async remove(req, res) {
    await Cart.findByIdAndDelete(req.params.id);
    res.redirect('back');
  }
}
