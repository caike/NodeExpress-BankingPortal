const express = require("express");
const path = require("path");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

let savingsTransactions = [
  {
    date: "05/14/2018",
    type: "Credit",
    description: "SHARP*EMPLOYER",
    status: "cleared",
    amount: "$2100.00"
  },
  {
    date: "05/13/2018",
    type: "Debit",
    description: "WITHDRAWL",
    status: "cleared",
    amount: "$600.00"
  }
]

let checkingTransactions = [
  {
    date: "05/14/2018",
    type: "Debit",
    description: "PS INST XFER",
    status: "cleared",
    amount: "$10.00"
  },
  {
    date: "05/13/2018",
    type: "Debit",
    description: "MICRO PAY",
    status: "cleared",
    amount: "$41.74"
  },
  {
    date: "05/13/2018",
    type: "Debit",
    description: "CAFE PS",
    status: "cleared",
    amount: "$6.76"
  },
  {
    date: "05/13/2018",
    type: "Debit",
    description: "LOCAL*GROCER",
    status: "cleared",
    amount: "$145.32"
  }
] 

let cardTransactions = [
  {
    date: "05/14/2018",
    type: "Debit",
    description: "ACME GAMES",
    status: "cleared",
    amount: "$193.25"
  },
  {
    date: "05/13/2018",
    type: "Debit",
    description: "YO*BOOKSTORE",
    status: "cleared",
    amount: "$134.23"
  },
  {
    date: "05/13/2018",
    type: "Debit",
    description: "The PS Store",
    status: "cleared",
    amount: "$54.67"
  }
]


app.get("/", (req, res) => res.render("index", { 
  title: "Index",
  savings: savingsTransactions,
  checking: checkingTransactions,
  card: cardTransactions
 }));

app.get("/savings", (req, res) => {
  res.render("transactions", {
    title: "Savings",
    transactions: savingsTransactions
  });
});

app.get("/checking", (req, res) => {
  res.render("transactions", {
    title: "Checking",
    transactions: checkingTransactions
  });
});

app.get("/cards", (req, res) => {
  res.render("transactions", {
    title: "Cards",
    transactions: cardTransactions
  });
});


app.get("/profile", (req, res) => {
  res.render("profile", {
    title: "Profile",
    details: {
      name: "PS User",
      username: "psuser",
      phone: "801-555-0101",
      email: "psuser@example.com",
      address: "1212 PS Circle, Project, Learning, 55555"
    }
  });
});

app.listen("3000", () => console.log("PS Project Running on port 3000!"));

module.exports = app;
