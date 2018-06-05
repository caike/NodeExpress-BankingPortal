const fs = require("fs");
const path = require("path");

let accountData = fs.readFileSync(
  path.join(__dirname, "json", "accounts.json")
);
let accounts = JSON.parse(accountData);
let userData = fs.readFileSync(path.join(__dirname, "json", "users.json"));
let users = JSON.parse(userData);

writeJSON = (contents) => {
  let json = JSON.stringify(contents, null, 4);
  fs.writeFileSync(path.join(__dirname, "json", "accounts.json"), json, "utf8");
}

module.exports = { 
  accounts, 
  users,
  writeJSON
}