const conf = require('./config')
const server = require('../index')
const request = require('supertest')

beforeAll(() => {
  const app = server.autowire(conf)
  server.start(app)
})

describe('get routes', () => {
  it('should return http-status 200 on /', async () => {
    const response = await request('http://localhost:8080').get('/')
    expect(response.status).toEqual(200)
  })
  it('should return the right body /', async () => {
    const response = await request('http://localhost:8080').get('/')
    expect(response.type).toEqual("application/json")
    expect(response.body.data).toEqual('get')
  })
})

describe('post routes', () => {
  it('should return http-status 200 on /', async () => {
    const response = await request('http://localhost:8080').post('/')
    expect(response.status).toEqual(200)
  })
  it('should return the right body /', async () => {
    const response = await request('http://localhost:8080').post('/')
    expect(response.type).toEqual("application/json")
    expect(response.body.data).toEqual('post')
  })
})

describe('put routes', () => {
  it('should return http-status 200 on /', async () => {
    const response = await request('http://localhost:8080').put('/')
    expect(response.status).toEqual(200)
  })
  it('should return the right body /', async () => {
    const response = await request('http://localhost:8080').put('/')
    expect(response.type).toEqual("application/json")
    expect(response.body.data).toEqual('put')
  })
})

describe('delete routes', () => {
  it('should return http-status 200 on /', async () => {
    const response = await request('http://localhost:8080').delete('/')
    expect(response.status).toEqual(200)
  })
  it('should return the right body /', async () => {
    const response = await request('http://localhost:8080').delete('/')
    expect(response.type).toEqual("application/json")
    expect(response.body.data).toEqual('delete')
  })
})