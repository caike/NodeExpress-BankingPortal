const fs = require('fs');
const path = require('path');
const esprima = require('esprima');
const esquery = require('esquery');

describe('Require `fs` and `path` built-ins.', () => {
  it('should contain requires @app-listen-console-log', () => {
    assert(typeof app === 'function', '`app` const has not been created in `app.js`.');
    let file;
    try {
      file = fs.readFileSync(path.join(process.cwd(), 'src/app.js'), 'utf8');
    } catch (e) {
      assert(false, 'The app.js file does not exist. Please make sure it was not deleted.');
    }

    const ast = esprima.parse(file);
    const listenResults = esquery(ast, 'ExpressionStatement[expression.callee.property.name="listen"]');
    assert(listenResults.length > 0, 'Your `app.js` does not contain a call to `app.listen`');
    const port = listenResults[0].expression.arguments[0].value;
    assert(port === '3000' || port === 3000, 'The port for the server has not been set to 3000');
    const consoleResults = esquery(ast, 'CallExpression[callee.object.name="console"]');
    const logResults = esquery(ast, 'CallExpression[callee.property.name="log"]');
    assert(consoleResults.length > 0 && logResults.length > 0, 'The app.listen is not printing anything to the console.');
  });
});
