const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

// const { accounts, users } = require('./data');

// const accountRoutes = require('./routes/accounts');
// const servicesRoutes = require('./routes/services');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// steps in views/index.ejs

app.get('/', (req, res) => res.render('index', { title: 'Index' }));

/* app.get('/', (req, res) =>
  res.render('index', { title: 'Accounts Summary', accounts })
); */

// steps in views/index.ejs

// app.get('/profile', (req, res) => res.render('profile', { user: users[0] }));

// steps in views/profile.ejs

// app.use('/account', accountRoutes);
// app.use('/services', servicesRoutes);

app.listen('3000', () => console.log('PS Project Running on port 3000!'));
