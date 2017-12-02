const map = require('ramda/src/map')
const filter = require('ramda/src/filter')
const propEq = require('ramda/src/propEq')
const prepend = require('ramda/src/prepend')

module.exports.autowire = (conf) => {
  /* app creation */
  const koa = require('koa')
  const app = new koa()
  const router = require('koa-router')()

  map((n) => app.use(require(n.package)(...n.options)), conf.koa.middlewares)

  var methodRoute = (method) => propEq('method', method)
  var isGetRoute = methodRoute('get')
  var isPostRoute = methodRoute('post')
  var isPutRoute = methodRoute('put')
  var isDeleteRoute = methodRoute('delete')
  var getFilter = filter(isGetRoute, conf.endpoints)
  var postFilter = filter(isPostRoute, conf.endpoints)
  var putFilter = filter(isPutRoute, conf.endpoints)
  var deleteFilter = filter(isDeleteRoute, conf.endpoints)

  map((n) => router.get(...prepend(n.route, n.middlewares)), getFilter)
  map((n) => router.post(...prepend(n.route, n.middlewares)), postFilter)
  map((n) => router.put(...prepend(n.route, n.middlewares)), putFilter)
  map((n) => router.delete(...prepend(n.route, n.middlewares)), deleteFilter)
  app.use(router.routes())

  app.context.db = conf.db
  app.context.server = conf.server

  return app
}

module.exports.start = (app) => {
  const http = require('http')
  const https = require('https')

  http.createServer(app.callback()).listen(app.context.server.httpPort)
  https.createServer(app.context.server, app.callback()).listen(app.context.server.httpsPort)
}
