const fs = require('fs');
const path = require('path');
const { assert } = require('chai');

describe('Require Express and Create `app` const.', () => {
  it('require express and create app const @app-require-express-const-app', () => {
    try {
      fs.readFileSync(path.join(process.cwd(), 'src/views/index.ejs'), 'utf8');
    } catch (e) {
      assert(false, 'The `index.ejs` view file does not exist.');
    }
  });
});
