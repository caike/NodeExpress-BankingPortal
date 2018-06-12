const { assert } = require('chai');
const app = require('../../app');

describe('Export `app` const', () => {
  it('should export the app const @app-module-exports-app', () => {
    assert(typeof app === 'function', '`app` const has not been exported in the app.js file');
  });
});
