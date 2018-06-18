const fs = require('fs');
const path = require('path');

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
    assert(writeFileSyncStub.firstCall.args[0] === path.join(__dirname, '../../src/json/accounts.json'), 'The path being passed to `writeFileSync` is incorrect.');
    assert(typeof writeFileSyncStub.firstCall.args[2] === 'string', 'The content being passed to `writeFileSync` is not a string.');
  });

  after(() => {
    handleSpy.restore();
    writeFileSyncStub.restore();
  });
});
