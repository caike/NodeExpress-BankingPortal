const { assert } = require('chai');
const request = require('supertest');
const app = require('../../app');

describe('Static Directory', () => {
  it('should set express static directory @app-use-express-static', done => {
    assert(typeof app === 'function', '`app` const has not been exported in the `app.js` file');
    request(app)
      .get('/css/styles.css')
      .expect(res => {
        assert(/^body {/.test(res.text), 'Looks as if the `public` directory has not been set as the static directory.');
      })
      .end(done);
  });
});
