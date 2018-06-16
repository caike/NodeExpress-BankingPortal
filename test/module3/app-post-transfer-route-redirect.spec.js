const R = require('ramda');

describe('app.js contains a Savings Route', () => {
  let spy;
  before(() => {
    spy = sinon.spy(app, 'use');
  });

  it('should contain the savings route @app-get-savings-account-route', done => {
    assert(typeof app === 'function', '`app` const has not been created in `app.js`.');
    request(app)
      .post('/transfer')
      .expect(() => {
        console.log(spy);
        // assert(spy.called, 'The transfer post route may have not been created.');
        // assert(
        //   spy.firstCall.args[0] === 'transfer',
        //   'The transfer route does not seem to be rendering the `transfer` view.'
        // );
        // assert(
        //   R.propEq('message', 'Transfer Completed')(spy.firstCall.args[1]),
        //   'The savings route maybe missing a savings account object.'
        // );
      })
      .end(done);
  });

  after(() => {
    spy.restore();
  });
});
