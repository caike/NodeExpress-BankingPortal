describe('Transfer post route', () => {
  it('should contain the post transfer route @app-post-transfer-route', () => {
    assert(typeof app === 'function', '`app` const has not been created in `app.js`.');

    const routes = app._router.stack;
    let postRoute;
    for (const key in routes) {
      if ({}.hasOwnProperty.call(routes, key)) {
        if (routes[key].route) {
          if (routes[key].route.path === '/transfer' && routes[key].route.methods.post) {
            postRoute = true;
          }
        }
      }
    }

    assert(postRoute, 'The `transfer` post route can not be found.');
  });
});
