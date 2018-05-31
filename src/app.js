// 1.1
const fs = require('fs');
const path = require("path");

// 1.2
const express = require("express");
const app = express();

// 1.3
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 3.1
app.use(express.urlencoded({ extended: true }));

// 1.4
app.use(express.static(path.join(__dirname, "public")));

// 2.1
let accountData = fs.readFileSync(path.join(__dirname, "json", "accounts.json"))
let accounts = JSON.parse(accountData);

// 2.2
let userData = fs.readFileSync(path.join(__dirname, "json", "users.json"))
let users = JSON.parse(userData);

// 2.3
let savings = accounts.savings;
let checking = accounts.checking;
let credit = accounts.credit;

// 1.5
// app.get("/", (req, res) => res.render("index", { title: "Index"}));

// 1.6 in views/index.ejs

// 2.4
app.get("/", (req, res) => res.render("index", { title: "Accounts Summary", accounts: accounts }));


// 2.5 in views/index.ejs

// 2.6
app.get("/savings", (req, res) => res.render("account", { title: savings.nickname, account: savings }));

// 2.7
app.get("/checking", (req, res) => res.render("account", { title: checking.nickname, account: checking }));

// 2.8
app.get("/credit", (req, res) => res.render("account", { title: credit.nickname, account: credit }));

// 2.9 in views/account.ejs

// 2.10
app.get("/profile", (req, res) => res.render("profile", { title: "Profile", user: users[0] }));

// 2.11 in views/profile.ejs


// 3.2
app.get("/transfer", (req, res) =>  res.render("transfer", { title: "Transfer", msg: req.query.msg }));

// 3.3 in views/transfer.ejs

// 3.4
app.post('/transfer', (req, res) => {
  // 3.5
  accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount;
  accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount);

  // 3.6
  let accountsJSON = JSON.stringify(accounts, null, 4)
  fs.writeFileSync(path.join(__dirname, "json", "accounts.json"), accountsJSON, 'utf8');
  
  // 3.7
  let string = encodeURIComponent("Transfer Completed");
  res.redirect('/transfer?msg=' + string);
});

// 4.1 in views/payment.ejs

// 4.2
app.get("/payment", (req, res) =>  res.render("payment", { title: "Make a Payment", account: credit, msg: req.query.msg }));

// 4.3
app.post('/payment', (req, res) => {
  // 4.4
  accounts['credit'].balance -= req.body.amount;
  accounts['credit'].available = parseInt(accounts['credit'].available) + parseInt(req.body.amount);

  // 4.5
  let accountsJSON = JSON.stringify(accounts, null, 4)

  // 4.6
  fs.writeFileSync(path.join(__dirname, "json", "accounts.json"), accountsJSON, 'utf8');
  
  // 4.7
  let string = encodeURIComponent("Payment Successful");

  // 4.8
  res.redirect('/payment?msg=' + string);
});


// 1.7
app.listen("3000", () => console.log("PS Project Running on port 3000!"));

// 1.8
module.exports = app;