const fs = require('fs');
const path = require('path');
const { assert } = require('chai');
const acorn = require('acorn');
const _ = require('lodash');

describe('View Directory and Engine', () => {
  it('require express and create app const @app-require-express-const-app', () => {
    let file;
    try {
      file = fs.readFileSync(path.join(process.cwd(), 'src/app.js'), 'utf8');
    } catch (e) {
      assert(
        false,
        'The app.js file does not exist. Please make sure it was not deleted.'
      );
    }

    const ast = acorn.parse(file);

    _.map(ast.body, objects => {
      if (objects.type === 'MemberExpression'){
        console.log(objects);
      }
    });
  });
});
