describe('Transfer post route from balance', () => {
  it('should contain from balance @app-post-transfer-route-from-balance', () => {
    assert(typeof app === 'function', '`app` const has not been created in `app.js`.');

    const routes = app._router.stack;
    for (const key in routes) {
      if ({}.hasOwnProperty.call(routes, key)) {
        if (routes[key].route) {
          if (routes[key].route.path === '/transfer' && routes[key].route.methods.post) {
            console.log(routes[key].route.stack[0].handle.toString());
          }
        }
      }
    }
  });
});
