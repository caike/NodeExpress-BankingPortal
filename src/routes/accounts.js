module.exports = (accounts) => {
    const express = require("express")
    const router = express.Router()
    app.get("/savings", (req, res) =>
      res.render("account", { account: accounts.savings })
    );
    app.get("/checking", (req, res) =>
      res.render("account", { account: accounts.checking })
    );
    app.get("/credit", (req, res) =>
      res.render("account", { account: accounts.credit })
    );
    return router;
};