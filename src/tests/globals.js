const chai = require('chai');
const request = require('supertest');
const app = require('../app.js');

Object.assign(global, { assert: chai.assert, request, app });
