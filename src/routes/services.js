const express = require("express");
const router = express.Router();
const { accounts, writeJSON } = require("../util");

router.get("/transfer", (req, res) => res.render("transfer"));

// Steps in views/transfer.ejs

router.post("/transfer", (req, res) => {
    accounts[req.body.from].balance -= req.body.amount;
    accounts[req.body.to].balance += parseInt(req.body.amount);

    writeJSON(accounts);
    res.render("transfer", { message: "Transfer Completed" });
});

router.get("/payment", (req, res) => res.render("payment", { account: accounts.credit }));
router.post("/payment", (req, res) => {
    accounts["credit"].balance -= req.body.amount;
    accounts["credit"].available += parseInt(req.body.amount);

    writeJSON(accounts);
    res.render("payment", { account: accounts.credit, message: "Payment Successful" });
});

module.exports = router;
