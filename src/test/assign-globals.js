'use strict'

const chai = require('chai')
const td = require('testdouble')

td.config({ignoreWarnings: true})

Object.assign(global, {
  assert: chai.assert,
  td
})