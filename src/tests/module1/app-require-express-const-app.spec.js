const fs = require('fs');
const path = require('path');
const { assert } = require('chai');
const esprima = require('esprima');
const esquery = require('esquery');

describe('Require Express and Create `app` const.', () => {
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

    const ast = esprima.parse(file);
    let results = esquery(
      ast,
      'VariableDeclaration[kind="const"] VariableDeclarator CallExpression[callee.name="require"] Literal[value="express"]'
    );
    assert(
      results.length > 0,
      'The express library has not been required in `app.js`.'
    );
    results = esquery(ast, 'VariableDeclaration[kind="const"] VariableDeclarator[id.name="app"] CallExpression[callee.name="express"]');
    assert(
      results.length > 0,
      'An `app` const has not been created.'
    );
  });
});
