describe('Require `data.js`', () => {
  it('should contain `services` const @app-require-express-const-app', () => {
    assert(typeof app === 'function', '`app` const has not been created in `app.js`.');
    let accounts;
    let writeJSON;
    try {
      accounts = servicesModule.__get__('accounts');
      writeJSON = servicesModule.__get__('writeJSON');
    } catch (err) {
      assert(accounts !== undefined, 'Has the `express` framework been required in `src/routes/services.js`?');
      assert(writeJSON !== undefined, 'Has the `express` framework been required in `src/routes/services.js`?');
    }
    assert(typeof accounts === 'object', 'Has the router const been set to the express router function?');
    assert(typeof writeJSON === 'function', 'Has the router const been set to the express router function?');
  });
});
