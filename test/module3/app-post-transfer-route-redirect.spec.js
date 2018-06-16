describe('Transfer post route redirect', () => {
  let spy;
  before(() => {
    spy = sinon.spy(app, 'render');
  });

  it('transfer post route should contain a render method @app-get-savings-account-route', done => {
    assert(typeof app === 'function', '`app` const has not been created in `app.js`.');
    request(app)
      .post('/transfer')
      .expect(() => {})
      .end(done);
  });

  after(() => {
    spy.restore();
  });
});
