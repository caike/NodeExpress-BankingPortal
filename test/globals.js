const request = require('supertest');
const rewire = require('rewire');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');

const appModule = rewire('../src/app');

chai.use(sinonChai);

let app;
try {
  app = appModule.__get__('app');
} catch (err) {
  app = undefined;
}

const routeStack = (path, method) => {
  let stack;
  const routes = app._router.stack;
  for (const key in routes) {
    if ({}.hasOwnProperty.call(routes, key)) {
      if (routes[key].route) {
        if (routes[key].route.path === path && routes[key].route.methods[method]) {
          stack = routes[key].route.stack[0];
        }
      }
    }
  }
  return stack;
};

Object.assign(global, {
  assert: chai.assert,
  expect: chai.expect,
  request,
  sinon,
  appModule,
  app,
  routeStack,
  mockReq,
  mockRes
});
