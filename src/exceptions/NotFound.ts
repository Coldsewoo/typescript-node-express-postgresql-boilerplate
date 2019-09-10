import HttpException from './HttpException'

export default class NotFound extends HttpException {
  constructor(item: string) {
    super(404, `${item} Not Found`)
  }
}
