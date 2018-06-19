describe('Require `fs` and `path` built-ins in data.js', () => {
  it('`data.js` should contain requires @app-require-built-ins', () => {
    let fs;
    let path;
    try {
      fs = dataModule.__get__('fs');
      path = dataModule.__get__('path');
    } catch (err) {
      assert(fs !== undefined, 'Has the `fs` built-in module been required in `data.js`?');
      assert(path !== undefined, 'Has the `path` built-in module been required in `data.js`?');
    }
  });
});
