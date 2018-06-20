const R = require('ramda');

describe('app.js contains a Savings Route', () => {
  let spy;
  before(() => {
    spy = sinon.spy(app, 'render');
  });

  it('should contain the savings route @app-get-savings-account-route', done => {
    assert(typeof app === 'function', '`app` const has not been created in `app.js`.');
    let route;
    if (request(app).get('/account/savings').expect(200)) {
      route = '/account/savings';
    } else {
      route = '/savings';
    }
    request(app)
      .get(route)
      .expect(() => {
        assert(spy.called, 'The savings route may have not been created.');
        assert(spy.firstCall.args[0] === 'account', 'The savings route does not seem to be rendering the `account` view.');
        assert(R.propEq('unique_name', 'savings')(spy.firstCall.args[1].account), 'The savings route maybe missing a savings account object.');
      })
      .end(done);
  });

  after(() => {
    spy.restore();
  });
});
