// 1.1
const fs = require('fs');
const path = require("path");

// 1.2
const express = require("express");
// 1.2.1
const app = express();

// 1.3
app.set("views", path.join(__dirname, "views"));
// 1.3.1
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
app.get("/", (req, res) => res.render("index", { title: "Index", accounts: accounts }));


// 2.5
app.get("/savings", (req, res) => res.render("account", { title: savings.nickname, account: savings }));

// 2.6 in views/index.ejs

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
  let fromNew = accounts[req.body.from].balance - req.body.amount;
  let toNew = parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount);
  
  // 3.6
  accounts[req.body.from].balance = fromNew;
  accounts[req.body.to].balance = toNew;
  
  // 3.7
  let accountsJSON = JSON.stringify(accounts)

  // 3.8
  fs.writeFileSync(path.join(__dirname, "json", "accounts.json"),accountsJSON, 'utf8');
  
  // 3.9
  let string = encodeURIComponent("Transfer Completed");

  // 3.10
  res.redirect('/transfer?msg=' + string);
});

// 1.7
app.listen("3000", () => console.log("PS Project Running on port 3000!"));

module.exports = app;
