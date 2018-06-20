const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const cheerio = require('cheerio');

describe('Update views', () => {
  it('should update all views @views-update-for-routes', () => {
    assert(fs.existsSync(path.join(process.cwd(), 'src/views/index.ejs')), 'The `src/views/index.ejs` file does not exist.');
    assert(fs.existsSync(path.join(process.cwd(), 'src/views/summary.ejs')), 'The `src/views/summary.ejs` file does not exist.');
    assert(fs.existsSync(path.join(process.cwd(), 'src/views/transfer.ejs')), 'The `src/views/transfer.ejs` file does not exist.');
    assert(fs.existsSync(path.join(process.cwd(), 'src/views/payment.ejs')), 'The `src/views/payment.ejs` file does not exist.');

    let indexFile;
    let summaryFile;
    let transferFile;
    let paymentFile;
    let $index;
    let $summary;
    let $transfer;
    let $payment;
    try {
      indexFile = fs.readFileSync(path.join(process.cwd(), 'src/views/index.ejs'), 'utf8');
      summaryFile = fs.readFileSync(path.join(process.cwd(), 'src/views/summary.ejs'), 'utf8');
      transferFile = fs.readFileSync(path.join(process.cwd(), 'src/views/transfer.ejs'), 'utf8');
      paymentFile = fs.readFileSync(path.join(process.cwd(), 'src/views/payment.ejs'), 'utf8');

      ejs.compile(indexFile);
      ejs.compile(summaryFile);
      ejs.compile(transferFile);
      ejs.compile(paymentFile);

      $index = cheerio.load(indexFile);
      $summary = cheerio.load(summaryFile);
      $transfer = cheerio.load(transferFile);
      $payment = cheerio.load(paymentFile);
    } catch (err) {
      const errorMessage = err.message.substring(0, err.message.indexOf('compiling ejs') - 1);
      assert(err.message.indexOf('compiling ejs') < -1, `${errorMessage} compiling index.ejs`);
    }

    assert($index('a')['1'].attribs.href === '/services/transfer', 'The index transfer link has not been updated.');
    assert($summary('a').attr('href') === '/account/<%= account.unique_name %>', 'The index transfer link has not been updated.');
    assert($transfer('#transferForm').attr('action') === '/services/transfer', 'The form action attribute has not been updated.');
    assert($payment('#paymentForm').attr('action') === '/services/payment', 'The form action attribute has not been updated.');
  });
});
