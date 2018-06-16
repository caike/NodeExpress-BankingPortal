const R = require('ramda');

describe('Checking and Credit Routes', () => {
  let spy;
  before(() => {
    spy = sinon.spy(app, 'render');
  });

  it('should contain the other account routes @app-get-other-account-routes', done => {
    assert(typeof app === 'function', '`app` const has not been created in `app.js`.');
    request(app)
      .get('/checking')
      .expect(() => {
        assert(spy.called, 'The checking route may have not been created.');
        assert(
          spy.firstCall.args[0] === 'account',
          'The checking route does not seem to be rendering the `account` view.'
        );
        assert(
          R.propEq('unique_name', 'checking')(spy.firstCall.args[1].account),
          'The checking route maybe missing a checking account object.'
        );
      });

    request(app)
      .get('/credit')
      .expect(() => {
        assert(spy.called, 'The credit route may have not been created.');
        assert(
          spy.firstCall.args[0] === 'account',
          'The credit route does not seem to be rendering the `account` view.'
        );
        assert(
          R.propEq('unique_name', 'credit')(spy.firstCall.args[1].account),
          'The credit route maybe missing a credit account object.'
        );
      });

    done();
  });

  after(() => {
    spy.restore();
  });
});
