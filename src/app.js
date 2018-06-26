const fs = require("fs");
const path = require("path");

const { accounts, users, writeJSON } = require("./data.js");

const express = require("express");
const app = express();

const accountRoutes = require("./routes/accounts.js");
const servicesRoutes = require("./routes/services.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));

app.use("/account", accountRoutes);
app.use("/services", servicesRoutes);

app.listen(3000, () => console.log("PS Project Running on port 3000!"));
