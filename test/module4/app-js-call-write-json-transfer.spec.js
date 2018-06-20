describe('Transfer post route writeJSON', () => {
  it('should include writeJSON @app-js-call-write-json-transfer', () => {
    assert(typeof app === 'function', '`app` const has not been created in `app.js`.');
    const stack = routeStack('/payment', 'post') || routeStack('/services/payment', 'post');
    assert(/writeJSON/.test(stack.handle.toString()), 'The transfer post function does not include a call to writeJSON.');
  });
});
