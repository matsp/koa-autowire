const R = require('ramda')

module.exports.autowire = (conf) => {
  /* app creation */
  const koa = require('koa')
  const app = new koa()
  const router = require('koa-router')()

  R.map((n) => app.use(require(n.package)(...n.options)), conf.koa.middlewares)

  var methodRoute = (method) => R.propEq('method', method)
  var isGetRoute = methodRoute('get')
  var isPostRoute = methodRoute('post')
  var isPutRoute = methodRoute('put')
  var isDeleteRoute = methodRoute('delete')
  var getFilter = R.filter(isGetRoute, conf.endpoints)
  var postFilter = R.filter(isPostRoute, conf.endpoints)
  var putFilter = R.filter(isPutRoute, conf.endpoints)
  var deleteFilter = R.filter(isDeleteRoute, conf.endpoints)

  R.map((n) => router.get(...R.prepend(n.route, n.middlewares)), getFilter)
  R.map((n) => router.post(...R.prepend(n.route, n.middlewares)), postFilter)
  R.map((n) => router.put(...R.prepend(n.route, n.middlewares)), putFilter)
  R.map((n) => router.delete(...R.prepend(n.route, n.middlewares)), deleteFilter)
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
