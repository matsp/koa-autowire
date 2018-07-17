const server = {
  httpPort: 8080,
  httpsPort: 8081
}
module.exports.server = server

const koa = {
  middlewares: {}
}
module.exports.koa = koa

const db = {}
module.exports.db = db

const endpoints = {
  getEndpoint: {
    method: 'get',
    route: '/',
    middlewares: [async (ctx) => { ctx.body = { data: 'get' } }]
  },
  postEndpoint: {
    method: 'post',
    route: '/',
    middlewares: [async (ctx) => { ctx.body = { data: 'post' } }]
  },
  putEndpoint: {
    method: 'put',
    route: '/',
    middlewares: [async (ctx) => { ctx.body = { data: 'put' } }]
  },
  deleteEndpoint: {
    method: 'delete',
    route: '/',
    middlewares: [async (ctx) => { ctx.body = { data: 'delete' } }]
  }
}
module.exports.endpoints = endpoints
