const conf = require('../test.config.js')
const server = require('../index.js')
const request = require('supertest')

const app = server.autowire(conf)

beforeAll(() => server.start(app))

afterAll(() => server.stop(app))

describe('get routes', () => {
  it('should return http-status 200 on /', async () => {
    const response = await request('http://localhost:8080').get('/')
    expect(response.status).toEqual(200)
  })
  it('should return the right body /', async () => {
    const response = await request('http://localhost:8080').get('/')
    expect(response.type).toEqual('application/json')
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
    expect(response.type).toEqual('application/json')
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
    expect(response.type).toEqual('application/json')
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
    expect(response.type).toEqual('application/json')
    expect(response.body.data).toEqual('delete')
  })
})
