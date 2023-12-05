import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

// config middleware 
mongoose.plugin(slug);

// model
const Course = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  description: { type: String },
  slug: { type: String, slug: 'name', unique: true, slugPaddingSize: 1 },
}, { timestamps: true })

export default mongoose.model('Course', Course);
