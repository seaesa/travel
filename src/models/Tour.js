import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';


// config middleware 
mongoose.plugin(slug);


// model
const Tour = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  description: String,
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
  slug: { type: String, slug: 'name', unique: true, slugPaddingSize: 1 },
}, { timestamps: true })

export default mongoose.model('Tour', Tour);
