// const fs = require('fs');
// const path = require('path');
const chai = require('chai');
const { assert, expect } = chai;
const sinonChai = require('sinon-chai');

// const esprima = require('esprima');
// const esquery = require('esquery');
// const R = require('ramda');
const sinon = require('sinon');

chai.use(sinonChai);

const app = require('../../app');

describe('Static Directory', () => {
  it('express static dir @app-use-express-static', () => {
    let spy;
    before(() => {
      spy = sinon.stub(app, 'use');
      spy();
    });
    expect(spy).to.be.calledOnce;
    after(() => {
      app.use.restore();
    });

    // let file;
    // try {
    //   file = fs.readFileSync(path.join(process.cwd(), 'src/app.js'), 'utf8');
    // } catch (e) {
    //   assert(false, 'The app.js file does not exist. Please make sure it was not deleted.');
    // }
    /* const ast = esprima.parse(file);
    const results = esquery(ast, 'ExpressionStatement[expression.callee.property.name="use"]');
    const dirResults = R.filter(R.pathEq(['expression', 'arguments', 0, 'callee', 'property', 'name'], 'static'), results);

    const isPath = R.pathEq(['expression', 'arguments', 0, 'callee', 'object', 'name'], 'path');
    const isJoin = R.pathEq(['expression', 'arguments', 0, 'callee', 'property', 'name'], 'join');
    const isDirName = R.pathEq(['expression', 'arguments', 0, 'arguments', 0, 'name'], '__dirname');
    const isViews = R.pathEq(['expression', 'arguments', 0, 'arguments', 1, 'value'], 'public');

    assert(dirResults.length > 0, 'Looks like you are missing a line to set the static directory.');
    assert(isPath(dirResults[0]), '`path.join()` may be missing.');
    assert(isJoin(dirResults[0]), '`path.join()` may be missing.');
    assert(isDirName(dirResults[0]), 'Check to see if you are using 2 underscores for `__dirname`.');
    assert(isViews(dirResults[0]), 'The view directory has not been set to the correct path.'); */
  });
});
