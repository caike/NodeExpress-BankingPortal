const R = require('ramda');

describe('Index Route', () => {
  it('should create the index route @app-get-index-route', done => {
    assert(typeof app === 'function', '`app` const has not been created in `app.js`.');
    const spy = sinon.spy(app, 'render');

    request(app)
      .get('/')
      .expect(() => {
        assert(spy.called, 'The index route may have not been created.');
        assert(spy.firstCall.args[0] === 'index', 'The index route does not seem to be rendering the `index` view.');
        assert(R.has('title')(spy.firstCall.args[1]), 'The index route maybe missing an object with a `title: "Index"` key value pair.');
      })
      .end(done);

    after(() => {
      spy.restore();
    });
  });
});
