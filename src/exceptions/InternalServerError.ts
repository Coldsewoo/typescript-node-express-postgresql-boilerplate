import HttpException from './HttpException'

export default class InternalServerError extends HttpException {
  constructor() {
    super(500, `Internal Server Error`)
  }
}
