import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  productId: { type: mongoose.Schema.Types.ObjectId },
  typeProduct: { type: String, enum: ['Course', 'Tour'] },
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: String,
  quantity: { type: Number, default: 1 },
  price: Number,
  totalPrice: Number,
  slug: { type: String }
}, { timestamps: true });
CartSchema.pre('save', function (next) {
  this.totalPrice = this.price * this.quantity
  return next();
})

export default mongoose.model('Cart', CartSchema);
