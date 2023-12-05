import mongoose from 'mongoose';
// connect mongodb
export default async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error)
  }
}
