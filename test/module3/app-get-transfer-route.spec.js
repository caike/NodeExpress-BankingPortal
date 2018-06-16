describe('Transfer get route.', () => {
  let spy;
  before(() => {
    spy = sinon.spy(app, 'render');
  });

  it('should contain the get transfer route @app-get-transfer-route', done => {
    assert(typeof app === 'function', '`app` const has not been created in `app.js`.');
    request(app)
      .get('/transfer')
      .expect(() => {
        assert(spy.called, 'The transfer route may have not been created.');
        assert(
          spy.firstCall.args[0] === 'transfer',
          'The transfer route does not seem to be rendering the `transfer` view.'
        );
      })
      .end(done);
  });

  after(() => {
    spy.restore();
  });
});
