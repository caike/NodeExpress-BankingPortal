const fs = require('fs');
const path = require('path');
const { assert } = require('chai');
const esprima = require('esprima');
const esquery = require('esquery');
const R = require('ramda');

const app = require('../../app');

describe('View Directory and Engine', () => {
  it('require express and create app const @app-require-express-const-app', () => {
    let file;
    try {
      file = fs.readFileSync(path.join(process.cwd(), 'src/app.js'), 'utf8');
    } catch (e) {
      assert(false, 'The app.js file does not exist. Please make sure it was not deleted.');
    }

    const ast = esprima.parse(file);
    const results = esquery(ast, 'ExpressionStatement[expression.callee.property.name="set"]');
    const dirResults = R.filter(R.pathEq(['expression', 'arguments', 0, 'value'], 'views'), results);
    const isPath = R.pathEq(['expression', 'arguments', 1, 'callee', 'object', 'name'], 'path');
    const isJoin = R.pathEq(['expression', 'arguments', 1, 'callee', 'property', 'name'], 'join');
    const isDirName = R.pathEq(['expression', 'arguments', 1, 'arguments', 0, 'name'], '__dirname');
    const isViews = R.pathEq(['expression', 'arguments', 1, 'arguments', 1, 'value'], 'views');

    assert(dirResults.length > 0, 'Looks like you are missing a line to set the view directory.');
    assert(isPath(dirResults[0]), '`path.join()` may be missing.');
    assert(isJoin(dirResults[0]), '`path.join()` may be missing.');
    assert(isDirName(dirResults[0]), 'Check to see if you are using 2 underscores for `__dirname`.');
    assert(isViews(dirResults[0]), 'The view directory has not been set to the correct path.');
    assert(app.locals.settings['view engine'] === 'ejs', 'The view engine has not been set to `ejs`');
  });
});
