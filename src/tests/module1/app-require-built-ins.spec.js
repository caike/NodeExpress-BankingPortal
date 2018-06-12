const fs = require('fs');
const path = require('path');
const { assert } = require('chai');
const esprima = require('esprima');
const esquery = require('esquery');

describe('Require `fs` and `path` built-ins.', () => {
  it('should contain requires @app-require-built-ins', () => {
    let file;
    try {
      file = fs.readFileSync(path.join(process.cwd(), 'src/app.js'), 'utf8');
    } catch (e) {
      assert(false, 'The app.js file does not exist. Please make sure it was not deleted.');
    }

    const ast = esprima.parse(file);
    let results = esquery(
      ast,
      'VariableDeclaration[kind="const"] VariableDeclarator CallExpression[callee.name="require"] Literal[value="fs"]'
    );
    assert(
      results.length > 0,
      'The built-in library `fs` has not been required in `app.js`. Check to see if you have used the `const` keyword.'
    );
    results = esquery(
      ast,
      'VariableDeclaration[kind="const"] VariableDeclarator CallExpression[callee.name="require"] Literal[value="path"]'
    );
    assert(
      results.length > 0,
      'The built-in library `path` has not been required in `app.js`. Check to see if you have used the `const` keyword.'
    );
  });
});
