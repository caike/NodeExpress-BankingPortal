const chai = require('chai');
const request = require('supertest');
const sinon = require('sinon');
const rewire = require('rewire');

const appModule = rewire('../src/app');
let app;

try {
  app = appModule.__get__('app');
} catch (err) {
  app = undefined;
}

Object.assign(global, {
  assert: chai.assert,
  expect: chai.expect,
  request,
  sinon,
  appModule,
  app
});
