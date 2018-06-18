const express = require('express');

const router = express.Router();
const { accounts } = require('../data');

// steps views/account.ejs

router.get('/savings', (req, res) =>
  res.render('account', { account: accounts.savings })
);
router.get('/checking', (req, res) =>
  res.render('account', { account: accounts.checking })
);
router.get('/credit', (req, res) =>
  res.render('account', { account: accounts.credit })
);

module.exports = router;
