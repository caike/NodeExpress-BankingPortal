const chai = require('chai');
const request = require('supertest');

Object.assign(global, { assert: chai.assert, request });
