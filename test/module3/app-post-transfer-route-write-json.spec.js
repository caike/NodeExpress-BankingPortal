const fs = require('fs');

describe('Transfer post route write JSON', () => {
  let stack;
  let handleSpy;
  let writeFileSyncStub;

  before(() => {
    stack = routeStack('/transfer', 'post');
    handleSpy = sinon.spy(stack, 'handle');
    writeFileSyncStub = sinon.stub(fs, 'writeFileSync');
  });

  it('should contain the index route @app-get-index-route', () => {
    assert(typeof app === 'function', '`app` const has not been created in `app.js`.');
    const request = {
      body: {
        from: 'savings',
        to: 'checking',
        amount: 100
      }
    };
    const req = mockReq(request);
    const res = mockRes();

    handleSpy(req, res);
    console.log(writeFileSyncStub.callCount);
  });

  after(() => {
    handleSpy.restore();
    writeFileSyncStub.restore();
  });
});
