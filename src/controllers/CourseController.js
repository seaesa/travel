import Course from '../models/Course.js';
import CourseCart from '../models/Cart.js'
export default new class CourseController {
  async index(req, res, next) {
    const course = await Course.find({}).lean()
    res.render(`course/index`, { course });
  }
  async show(req, res, next) {
    const courseAll = await Course.find({}).lean()
    const course = await Course.findOne({ slug: req.params.slug }).lean()
    res.render(`course/show`, { course, courseAll });
  }
  async add(req, res, next) {
    const { quantity } = req.query;
    const course = new CourseCart(req.session.course ? req.session.course : {})
    const courseId = await Course.findById(req.params.id);
    course.add(courseId, courseId.id, quantity);
    req.session.course = course;
    res.redirect('back');
  }
  async deleteCourseCart(req, res, next) {
    if (!req.session.course) res.redirect('/cart')
    let ids = req.params.id;
    const course = new CourseCart(req.session.course);
    course.remove(ids);
    req.session.course = course;
    res.redirect('back');
  }
}
