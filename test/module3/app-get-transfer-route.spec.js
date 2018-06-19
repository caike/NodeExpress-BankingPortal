describe('Transfer get route', () => {
  let stack;
  let handleSpy;

  before(() => {
    stack = routeStack('/transfer', 'get');
    handleSpy = sinon.spy(stack, 'handle');
  });

  it('should contain the get transfer route @app-get-transfer-route', () => {
    assert(typeof app === 'function', '`app` const has not been created in `app.js`.');
    const req = mockReq();
    const res = mockRes();

    handleSpy(req, res);
    assert(res.render.called, 'The transfer post route may have not been created.');
  });

  after(() => {
    handleSpy.restore();
  });
});
