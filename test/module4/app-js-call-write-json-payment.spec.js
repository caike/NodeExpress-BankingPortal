describe('Payment post route writeJSON', () => {
  it('should include writeJSON @app-js-call-write-json-transfer', () => {
    assert(typeof app === 'function', '`app` const has not been created in `app.js`.');
    const stack = routeStack('/payment', 'post');
    assert(/writeJSON/.test(stack.handle.toString()), 'The payment post function does not include a call to writeJSON.');
  });
});
