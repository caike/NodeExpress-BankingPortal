const fs = require('fs');
const path = require('path');
const rewire = require('rewire');

describe('Require `data.js`', () => {
  it('should contain `services` const @app-require-express-const-app', () => {
    assert(typeof app === 'function', '`app` const has not been created in `app.js`.');
    assert(fs.existsSync(path.join(process.cwd(), 'src/routes/services.js')), 'The `src/routes/services.js` file does not exist.');
    let accounts;
    let writeJSON;
    try {
      const servicesModule = rewire('../src/routes/services');
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
