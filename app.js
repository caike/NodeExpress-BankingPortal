const express = require('express');

const app = express();

app.get('/', (req, res) => res.send(
  `YourBank<br>
  <a href="/account/savings">Savings Account</a><br>
  <a href="/account/checking">Checking Account</a>`
));

app.get('(/account)?/savings', (req, res) => {
  res.json([
    {
      date: '05/14/2018',
      type: 'Credit',
      description: 'SHARP*EMPLOYER',
      status: 'cleared',
      amount: '$2100.00'
    },
    {
      date: '05/13/2018',
      type: 'Debit',
      description: 'WITHDRAWL',
      status: 'cleared',
      amount: '$600.00'
    }
  ]);
});

app.get('(/account)?/checking', (req, res) => {
  res.json([
    {
      date: '05/14/2018',
      type: 'Debit',
      description: 'PS INST XFER',
      status: 'cleared',
      amount: '$10.00'
    },
    {
      date: '05/13/2018',
      type: 'Debit',
      description: 'MICRO PAY',
      status: 'cleared',
      amount: '$41.74'
    },
    {
      date: '05/13/2018',
      type: 'Debit',
      description: 'CAFE PS',
      status: 'cleared',
      amount: '$6.76'
    },
    {
      date: '05/13/2018',
      type: 'Debit',
      description: 'LOCAL*GROCER',
      status: 'cleared',
      amount: '$145.32'
    }
  ]);
});

app.get('/profile', (req, res) => {
  res.send(`<div>
              <ul>
                <li>Name: PS User</li>
                <li>Username: psuser</li>
                <li>Phone: 801-555-0101</li>
                <li>Address: 1212 PS Circle, Project, Learning, 55555</li>
              </ul>
            </div>`);
});

app.listen('3000', () => console.log('PS Project Running on port 3000!'));

module.exports = app;
