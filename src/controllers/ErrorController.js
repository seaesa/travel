export default new class ErrorController {
  async error(req, res, next) {
    res.render(`error/error`, { layout: `error` });
  }
}
