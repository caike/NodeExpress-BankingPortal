const fs = require('fs');

describe('Transfer post route from balance', () => {
  let stack;
  let handleSpy;
  let writeFileSyncStub;

  before(() => {
    stack = routeStack('/transfer', 'post');
    handleSpy = sinon.spy(stack, 'handle');
    writeFileSyncStub = sinon.stub(fs, 'writeFileSync');
  });

  it('should calculate `from` balance @app-post-transfer-route-from-balance', () => {
    assert(typeof app === 'function', '`app` const has not been created in `app.js`.');
    const request = { body: { from: 'savings', to: 'checking', amount: 100 } };

    let accounts;

    try {
      accounts = appModule.__get__('accounts');
    } catch (err) {
      assert(accounts !== undefined, 'Has the `accounts` variable been created in `app.js`?');
    }

    const req = mockReq(request);
    const res = mockRes();

    const currentBalance = accounts[request.body.from].balance;
    handleSpy(req, res);
    const newBalance = accounts[request.body.from].balance;

    assert(currentBalance - request.body.amount === newBalance, 'Your calculation for the new `from` account balance seem to be incorrect.');
  });

  after(() => {
    handleSpy.restore();
    writeFileSyncStub.restore();
  });
});
