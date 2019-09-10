import HttpException from './HttpException'

export default class TooManyRequests extends HttpException {
  constructor() {
    super(429, `Too Many Requests`)
  }
}
