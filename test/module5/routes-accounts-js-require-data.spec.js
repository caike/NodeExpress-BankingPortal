describe('Require `data.js`', () => {
  it('should contain `accounts` const @app-require-express-const-app', () => {
    assert(typeof app === 'function', '`app` const has not been created in `app.js`.');
    let accounts;
    try {
      accounts = accountsModule.__get__('accounts');
    } catch (err) {
      assert(accounts !== undefined, 'Has the `data.js` been required and `accounts` const been created `src/routes/accounts.js`?');
    }
    assert(typeof accounts === 'object', 'Is the `accounts` const an object?');
  });
});
