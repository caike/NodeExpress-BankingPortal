const fs = require('fs');
const path = require('path');
const { assert } = require('chai');
const ejs = require('ejs');

describe('Create `index` view', () => {
  it('should create the index view @index-ejs-create-view-app', () => {
    let file;
    try {
      file = fs.readFileSync(path.join(process.cwd(), 'src/views/index.ejs'), 'utf8');
    } catch (e) {
      assert(false, 'The `index.ejs` view file does not exist.');
    }

    try {
      const template = ejs.compile(file);
      console.log(template());
    } catch (err) {
      // const errorMessage = err.message.substring(0, err.message.indexOf('compiling ejs'));
      // assert(err.message.indexOf('compiling ejs') < -1, `${errorMessage}compiling index.ejs`);
    }
  });
});
