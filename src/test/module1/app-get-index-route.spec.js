const { assert } = require('chai');
const sinon = require('sinon');
const request = require('supertest');
const R = require('ramda');
const app = require('../../app');

describe('Index Route', () => {
  it('should create the index route @app-get-index-route', done => {
    const spy = sinon.spy(app, 'render');

    after(() => {
      spy.restore();
    });

    assert(typeof app === 'function', '`app` const has not been exported in the app.js file');
    request(app)
      .get('/')
      .expect(() => {
        assert(spy.getCall(0).args[0] === 'index', 'The index route does not seem to be rendering the `index` view.');
        assert(R.has('title')(spy.getCall(0).args[1]), 'The index route maybe missing an object with a `title: \'Index\'` key value pair.');
      })
      .end(done);
  });
});
