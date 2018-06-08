const fs = require('fs');
const path = require('path');
const { assert } = require('chai');
const esprima = require('esprima');
const esquery = require('esquery');
const R = require('ramda');

describe('Export `app` const.', () => {
  it('export app const @app-module-exports-app', () => {
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
    const results = esquery(ast, 'AssignmentExpression[left.object.name="module"]');
    assert(results.length > 0, 'The `app` const has not been exported.');

    const moduleExportAppFound = R.allPass([
      R.pathEq(['left', 'object', 'name'], 'module'),
      R.pathEq(['left', 'property', 'name'], 'exports'),
      R.pathEq(['right', 'name'], 'app')
    ]);
    assert(moduleExportAppFound(results[0]), 'The `app` const has not been exported.');
  });
});
