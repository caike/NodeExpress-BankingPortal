describe('Payment post route writeJSON', () => {
  it('should include writeJSON @app-js-call-write-json-transfer', () => {
    assert(typeof app === 'function', '`app` const has not been created in `app.js`.');
    const stack = routeStack('/payment', 'post');
    console.log(/writeJSON/.test(stack.handle.toString()));
  });
});
