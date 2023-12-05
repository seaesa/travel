import mongoose from 'mongoose';
import slugify from 'slugify'

const Users = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  data: Buffer,
  contentType: String,
  defaultImage: { type: String, default: 'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/8344fa89-86fa-41db-af28-bcf3a3c6a35a/width=450/00002-3970795413.jpeg' },
  address: { type: String },
  phone: { type: Number },
  slug: { type: String },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
}, { timestamps: true })
Users.pre('save', async function (next) {
  if (this.slug && this.slug.startsWith('@')) return next();
  else {
    this.slug = slugify(`@${this.username}`, { lower: true, trim: true });
    return next();
  }
})
export default mongoose.model('User', Users);
