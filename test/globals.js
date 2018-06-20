const request = require('supertest');
const rewire = require('rewire');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');

const appModule = rewire('../src/app');
const dataModule = rewire('../src/data');
const accountsModule = rewire('../src/routes/accounts');
const servicesModule = rewire('../src/routes/services');

chai.use(sinonChai);

let app;
try {
  app = appModule.__get__('app');
} catch (err) {
  app = undefined;
}

const getRouteMethods = route => {
  const methods = [];
  for (const method in route.methods) {
    if (method === '_all') {
      continue;
    }
    methods.push(method);
  }
  return methods;
};
const hasParams = value => {
  const regExp = /\(\?:\(\[\^\\\/]\+\?\)\)/g;
  return regExp.test(value);
};
const getAllStacks = (app, path, endpoints) => {
  const regExp = /^\/\^\\\/(?:(:?[\w\\.-]*(?:\\\/:?[\w\\.-]*)*)|(\(\?:\(\[\^\\\/]\+\?\)\)))\\\/.*/;
  const stack = app.stack || (app._router && app._router.stack);

  endpoints = endpoints || [];
  path = path || '';

  stack.forEach(val => {
    if (val.route) {
      endpoints.push({
        path: getRouteMethods(val.route)[0] + ' ' + path + (path && val.route.path === '/' ? '' : val.route.path),
        stack: val.route.stack[0]
      });
    } else if (val.name === 'router' || val.name === 'bound dispatch') {
      let newPath = regExp.exec(val.regexp);

      if (newPath) {
        let parsedRegexp = val.regexp;
        let keyIndex = 0;

        while (hasParams(parsedRegexp)) {
          parsedRegexp = parsedRegexp.toString().replace(/\(\?:\(\[\^\\\/]\+\?\)\)/, ':' + val.keys[keyIndex].name);
          keyIndex++;
        }

        if (parsedRegexp !== val.regexp) {
          newPath = regExp.exec(parsedRegexp);
        }

        const parsedPath = newPath[1].replace(/\\\//g, '/');
        getAllStacks(val.handle, path + '/' + parsedPath, endpoints);
      } else {
        getAllStacks(val.handle, path, endpoints);
      }
    }
  });
  return endpoints;
};

const routeStack = (path, method) => {
  const allStacks = getAllStacks(app);
  let found;
  allStacks.forEach(stack => {
    if (stack.path === (method + ' ' + path)) {
      found = stack.stack;
    }
  });
  return found || undefined;
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
  mockRes,
  dataModule,
  accountsModule,
  servicesModule
});
