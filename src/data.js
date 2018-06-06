const fs = require('fs');
const path = require('path');

const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'));
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'));
const users = JSON.parse(userData);

const writeJSON = () => {
  const json = JSON.stringify(accounts, null, 4);
  fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), json, 'utf8');
};

module.exports = {
  accounts,
  users,
  writeJSON
};
