import Course from '../models/Course.js';
import CourseCart from '../models/Cart.js'
export default new class CourseController {
  async index(req, res, next) {
    const course = await Course.find({}).lean()
    res.render(`course/index`, { course });
  }
  async show(req, res, next) {
    const course = await Course.findOne({ slug: req.params.slug }).lean()
    if(!course) return next()
    const courseAll = await Course.find({}).lean()
    res.render(`course/show`, { course, courseAll });
  }
}
