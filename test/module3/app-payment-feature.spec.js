const fs = require('fs');
const path = require('path');

describe('Payment Feature', () => {
  let stack;
  let handleSpy;
  let writeFileSyncStub;

  before(() => {
    stack = routeStack('/payment', 'post');
    handleSpy = sinon.spy(stack, 'handle');
    writeFileSyncStub = sinon.stub(fs, 'writeFileSync');
  });

  it('should contain payment route @app-payment-feature', () => {
    assert(typeof app === 'function', '`app` const has not been created in `app.js`.');
    const request = { body: { amount: 325 } };

    let accounts;

    try {
      accounts = appModule.__get__('accounts');
    } catch (err) {
      assert(accounts !== undefined, 'Has the `accounts` variable been created in `app.js`?');
    }

    const req = mockReq(request);
    const res = mockRes();

    const { available } = accounts.credit;
    const { balance } = accounts.credit;
    handleSpy(req, res);
    const newAvailable = accounts.credit.available;
    const newBalance = accounts.credit.balance;

    assert(res.render.called, 'The payment post route may have not been created.');
    assert(
      res.render.calledWithExactly('payment', {
        message: 'Payment Successful'
      }),
      '`res.render` is not being called with the correct arguments.'
    );
    assert(
      balance - request.body.amount === newBalance,
      'Your calculation for the credit balance seem to be incorrect.'
    );
    assert(
      available + request.body.amount === newAvailable,
      'Your calculation for the available balance seem to be incorrect.'
    );
    assert(
      writeFileSyncStub.firstCall.args[0] === path.join(__dirname, '../../src/json/accounts.json'),
      'The path being passed to `writeFileSync` is incorrect.'
    );
    assert(
      typeof writeFileSyncStub.firstCall.args[1] === 'string',
      'The content being passed to `writeFileSync` is not a string.'
    );
    assert(
      writeFileSyncStub.firstCall.args[2].replace('-', '').toLowerCase() === 'utf8',
      'It is best if you encode the string as utf8'
    );
  });

  after(() => {
    handleSpy.restore();
    writeFileSyncStub.restore();
  });
});
