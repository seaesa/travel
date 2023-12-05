export default {
  customNumberRenderView: (app, num) => app.filter((item, index) => index >= num ? null : item),
  totalQuantity: (tour = 0, course = 0) => (tour && Object.keys(tour).length) + (course && Object.keys(course).length),
  booleans: (tour = [], course = []) => tour.length || course.length || false,
  handleTitleApp: (tour, course) => tour || course ? tour || course : 'Traveling',
  handleError: (a, b) => a || b,
  handleErrorIsTrue: (a, b) => a && b,
  handleImage: (contentType, data, url) => contentType && data ? `data:image/${contentType};base64,${data.toString('base64')}` : url,
}