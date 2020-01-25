import { RequestHandler, send } from 'micro'
import { router, get } from 'microrouter'

const test: RequestHandler = (req, res) => {
  send(res, 200, { message: 'Test' })
}

module.exports = router(get('/', test))
