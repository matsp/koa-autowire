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

  const methodRoute = (method) => propEq('method', method)
  const isGetRoute = methodRoute('get')
  const isPostRoute = methodRoute('post')
  const isPutRoute = methodRoute('put')
  const isDeleteRoute = methodRoute('delete')
  const getFilter = filter(isGetRoute, conf.endpoints)
  const postFilter = filter(isPostRoute, conf.endpoints)
  const putFilter = filter(isPutRoute, conf.endpoints)
  const deleteFilter = filter(isDeleteRoute, conf.endpoints)

  map((n) => router.get(...prepend(n.route, n.middlewares)), getFilter)
  map((n) => router.post(...prepend(n.route, n.middlewares)), postFilter)
  map((n) => router.put(...prepend(n.route, n.middlewares)), putFilter)
  map((n) => router.delete(...prepend(n.route, n.middlewares)), deleteFilter)
  app.use(router.routes())

  app.context.db = conf.db
  app.context.server = conf.server
  app.context.router = router

  return app
}

module.exports.start = (app) => {
  const http = require('http')
  const https = require('https')

  const httpServer = http.createServer(app.callback()).listen(app.context.server.httpPort)
  const httpsServer = https.createServer(app.context.server, app.callback()).listen(app.context.server.httpsPort)

  app.context.httpServer = httpServer
  app.context.httpsServer = httpsServer
}

module.exports.stop = (app) => {
  app.context.httpServer.close()
  app.context.httpsServer.close()
}
