# koa-autowire
[![npm](https://img.shields.io/npm/l/koa-autowire.svg)]()
[![npm](https://img.shields.io/npm/dt/koa-autowire.svg)](https://www.npmjs.com/package/koa-autowire)

[![npm version](https://badge.fury.io/js/koa-autowire.svg)](https://badge.fury.io/js/koa-autowire)
[![Build Status](https://travis-ci.org/matsp/koa-autowire.svg?branch=master)](https://travis-ci.org/matsp/koa-autowire) 
[![Greenkeeper badge](https://badges.greenkeeper.io/matsp/koa-autowire.svg)](https://greenkeeper.io/)

## installation

`npm install koa-autowire`

or

`yarn add koa-autowire`

## configuration

you need to pass a config file or object which include the following named exports or keys:

``` javascript
const db = {
  // should be your db instance which will be referenced in koa context object
}
const server = {
  key: // your ssl private key,
  cert: // your ssl certificate,
  httpPort: 80, // on this port koa will accept http
  httpsPort: 443 // on this port koa will accept https
}
const koa = {
  middlewares: {
    customName: {
      package: '', // any koa middleware
      options: [] // constructor options
    }
  }
}
const endpoints = {
  customName: {
    method: '', // route endpoint method --> post, get, put, delete
    route: '', // route path
    middlewares: [] // middleware functions that will be used
  }
}
```


## usage

``` javascript
const config = require('./config.js')
const server = require('koa-autowire')

const app = server.autowire(config)
server.start(app);
 
```

