const fs = require('fs');
const path = require("path");
const express = require("express");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

let accountData = fs.readFileSync(path.join(__dirname, "json", "accounts.json"))
let accounts = JSON.parse(accountData);

let userData = fs.readFileSync(path.join(__dirname, "json", "users.json"))
let users = JSON.parse(userData);

let savings = accounts.savings;
let checking = accounts.checking;
let credit = accounts.credit;

app.get("/", (req, res) => res.render("index", { title: "Index", accounts: accounts }));
app.get("/savings", (req, res) => res.render("account", { title: savings.nickname, account: savings }));
app.get("/checking", (req, res) => res.render("account", { title: checking.nickname, account: checking }));
app.get("/credit", (req, res) => res.render("account", { title: credit.nickname, account: credit }));
app.get("/profile", (req, res) => res.render("profile", { title: "Profile", user: users[0] }));

app.get("/transfer", (req, res) =>  res.render("transfer", { title: "Transfer", msg: req.query.msg }));
app.post('/transfer', (req, res) => {
  let fromNew = accounts[req.body.from].balance - req.body.amount;
  let toNew = parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount);
  accounts[req.body.from].balance = fromNew;
  accounts[req.body.to].balance = toNew;
  fs.writeFileSync(path.join(__dirname, "json", "accounts.json"), JSON.stringify(accounts), 'utf8');
  let string = encodeURIComponent("Transfer Completed");
  res.redirect('/transfer?msg=' + string);
});

app.listen("3000", () => console.log("PS Project Running on port 3000!"));

module.exports = app;
