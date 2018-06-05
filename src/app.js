const fs = require("fs");
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

// Steps in views/index.ejs

app.get("/", (req, res) => res.render("index", { title: "Accounts Summary", accounts: accounts }));

// Steps in views/index.ejs

app.get("/savings", (req, res) => res.render("account", { account: savings }));
app.get("/checking", (req, res) => res.render("account", { account: checking }));
app.get("/credit", (req, res) => res.render("account", { account: credit }));

// Steps views/account.ejs

app.get("/profile", (req, res) => res.render("profile", { user: users[0] }));

// Steps in views/profile.ejs

app.get("/transfer", (req, res) => res.render("transfer"));

// Steps in views/transfer.ejs

app.post("/transfer", (req, res) => {
  accounts[req.body.from].balance -= req.body.amount;
  accounts[req.body.to].balance += parseInt(req.body.amount);

  let accountsJSON = JSON.stringify(accounts, null, 4)
  fs.writeFileSync(path.join(__dirname, "json", "accounts.json"), accountsJSON, "utf8");

  res.render("transfer", { message: "Transfer Completed" });
});

app.get("/payment", (req, res) =>  res.render("payment", { account: credit }));
app.post("/payment", (req, res) => {
  accounts["credit"].balance -=  req.body.amount;
  accounts["credit"].available += parseInt(req.body.amount);

  let accountsJSON = JSON.stringify(accounts, null, 4)
  fs.writeFileSync(path.join(__dirname, "json", "accounts.json"), accountsJSON, "utf8");
  
  res.render("payment", { account: credit, message: "Payment Successful" });
});

app.listen("3000", () => console.log("PS Project Running on port 3000!"));

module.exports = app;