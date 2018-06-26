const express = require("express");
const router = express.Router();

const { accounts, writeJSON } = require("./../data.js");

router.get("/transfer", (req, res) => {
  res.render("transfer");
});

router.post("/transfer", (req, res) => {
  const account_from = accounts[req.body.from]
  const balance_from = account_from.balance;
  account_from.balance = balance_from - req.body.amount;

  const account_to = accounts[req.body.to];
  account_to.balance += parseInt(req.body.amount);

  writeJSON();

  res.render("transfer", { message: "Transfer Completed" });
});

router.get("/payment", (req, res) => {
  res.render("payment", {accounts: accounts.credit});
});

router.post("/payment", (req, res) => {
  accounts.credit.balance = accounts.credit.balance - parseInt(req.body.amount);
  accounts.credit.available += parseInt(req.body.amount);

  writeJSON();

  res.render("payment", { message: "Payment Successful", account: accounts.credit });
});

module.exports = router;
