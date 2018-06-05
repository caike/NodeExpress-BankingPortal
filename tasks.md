# Setup

## Installation
Run the following command from root folder of the cloned project to install all dependencies.

`npm install`

## Verify Setup
In order to verify that everything is setup correctly, run the following command, which should show you the failing tests. This is good! We’ll be fixing these tests once we jump into the build step.

`npm run test`

Every time you want to check your work locally you can type that command, and it will report the status of every task in that module.
As you move through the modules, you can run module-specific tests with the script `npm run test:module1`, replacing the number with one that corresponds with the module you are working in.

## Previewing Your Work
In order to see your changes in a browser, you can run `npm run dev` to start the application, and when you visit http://localhost:3000 in a browser, you should see your components rendered.

# Module 01 - Using Express to Create a Server
## 1.1 - Require Built-in Libraries
@app-require-built-ins In `app.js` require the built-in library `fs` and store a reference to it in a `const` called `fs`. Next, require the built-in library `path` and store a reference to it in a `const` called `path`. 

## 1.2 - Require the Express Framework
@app-require-express-const-app In app.js, require the express framework and store a reference to it in a `const` called `express`. Next, call the express function and store it in a `const` called `app`.

## 1.3 - Configure the View Directory and Engine
@app-set-views-directory-engine Still in app.js, use the `set` function of your newly created `app` to configure the directory where our `views` can be found. Using the same `set` function, set the `view engine` to `ejs`. **Hint: `path.join()` & `__dirname`**

## 1.4 - Configure the Static Directory
@app-use-express-static All of our CSS/JS for the client-side is found in the `public` directory. We need to point express to `public`. 
* In app.js call the `use` function of `app` with a call to the `express.static()` function as the only parameter. 
* `express.static()` should be passed the full path to the `public` directory. **Hint: `path.join()` & `__dirname`**

## 1.5 - Create the Index Route
@app-get-index-route create a `get` route that points at the root URL path ‘/‘. Render the `index` view (created in the next step) and pass an object with a single key value pair, `title: “Index”`.

## 1.6 - Create the Index View File
@index-ejs-create-view-file Create a new file called `index.ejs` in the `src/views/` directory.

## 1.7 - Create the Index View
@index-ejs-create-view In the newly created file `index.ejs` complete the following:
* Include `header.ejs` **Hint: <%- -%>**
* Add a `div` element with a class of `container`.
* In the container div display the value of the `title` key in an `h1` element. **Hint: <%= %>**
* Add an anchor element below the `h1` that points to the `/profile` URL path, and has the text content “Profile”.
* Below the container div add a line break and another anchor element that points to the `/transfer` URL path with the text content `Transfer`. 
* Include `footer.ejs` **Hint: <%- -%>**

## 1.8 - Start Server
@app-listen-console-log In `app.js` using the `listen` function to create a server that listens on port `3000` and then prints the message “PS Project Running on port 3000!” to the console after the server is created.

## 1.9 - Export App
@app-module-exports-app In order for your application to be tested please add the line `module.exports = app` to `app.js` . 

# Module 02 - File Handling and Routing
## 2.1 - Read Account Data
@app-read-account-data In `app.js` near your index route, use the `readFileSync` function of the built-in `fs` library to read the contents of the file located at `src/json/accounts.json`. Using `let` declare a variable called `accountData` to store the contents of the file. `accountData` now contains JSON, use `JSON.parse` to convert it to a javascript object. Using `let` declare a variable called `accounts` to store this javascript object. 

## 2.2 - Read User Data
@app-read-user-data In `app.js` near the index route, use the `readFileSync` function of the built-in `fs` library to read the contents of the file located at `src/json/users.json`. Using `let` declare a variable called `userData` to store the contents of the file. `userData` now contains JSON, use `JSON.parse` to convert it to a javascript object. Using `let` declare a variable called `users` to store this javascript object.

## 2.3 - Update the Index Route
@app-update-route In `app.js` update the object passed to the existing index route. The `title` should be “Accounts Summary”. A new key value pair should be added, `accounts: accounts`.

## 2.4 - Update the Index View
@index-ejs-update-view In `index.ejs` and after the ejs markup that displays the `title`, add the ejs markup to include the `summary` view for each account in the `accounts` variable, savings, checking, and credit. **Hint: you will have three include statements(`<%- -%>`), each `include` function will be passed a different account, i.e `{ account: accounts.checking }`.**

## 2.5 - Create the Savings Account Route
@app-get-savings-account-route In `app.js` near the index route, create a `get` route that points at the `/savings` URL path. Render the `account` view and pass an object with the following key value pair:
* `account: acounts.savings`

## 2.6 - Create the Checking & Credit Routes
@app-get-checking-account-route Now that you have created the savings account route, create similar routes for the checking and credit accounts in the `app.js` file.

## 2.7 - Show Account Transactions
@account-ejs-show-transactions In `account.ejs` after the header markup, add the ejs markup to include the `transactions` view. Pass the include function an object with the following key value pair: 
* `account: account`

## 2.8 - Create the Profile Route
@app-get-profile-route Back In `app.js` create a `get` route that points at the `/profile` URL path. Render the `profile` view and pass an object with the following key value pair:
* `user: users[0]`

## 2.9 - Create the Profile View File
@profile-ejs-create-view-file Create a new file called `profile.ejs` in the `src/views/` directory.

## 2.10 - Create the Profile View
@profile-ejs-create-view In the newly created file `profile.ejs` complete the following:
* Include `header.ejs` **Hint: <%- -%>**
* Add an `h1` element with the text content `Profile`
* Add a `div` element below the `h1` that displays each detail of the `user` object on a new line, name, username, phone, email, and address.
* Below the `div` add a line break, then an anchor element that points to the root URL path and has the text content `Back to Account Summary`.     
* Include `footer.ejs` **Hint: <%--%>** 

# Module 03 - Handling Form Data
## 3.1 - URL Encoded Middleware
@app-urlencoded-form-data In `app.js` near where you have done your other imports add Express middleware to handle POST data. With the `use` function add the `express.urlencoded` middleware to `app`. Make sure to set the `extended` option to `true`.

## 3.2 - Create the Transfer GET Route
@app-get-transfer-route Near your other routes in   `app.js` create a `get` route that points to the `/transfer` URL path. It should render the `transfer` view.

## 3.3 - Update the Transfer View
@transfer-ejs-update-view In `transfer.ejs` in the `src/views/` directory complete the following:
* Add the necessary attributes to the `transferForm` so that it posts to a transfer route.
* Add a `name` and `id` attribute with a value of `from` to the first select.
* * Add a `name` and `id` attribute with a value of `to` to the second select.

## 3.4 - Create the Transfer POST Route
@app-post-transfer-route Switch back to `app.js` and create a `post` route that points to the `/transfer` URL path. We will fill in the body of the function for this route in the next few steps.

## 3.5 - Calculate New Balances
@app-post-transfer-route-from-balance Still in `app.js` and in the function body of the post route we are going to calculate the new balances for the account we are transferring from. 

We have several values that have been entered into the HTML form in `transfer.ejs`. Upon form submission the request body will contain `from`, `to`, and `amount`. Current balances are stored in the `accounts` object in this form `accounts[‘savings’].balance`. Using these values calculate the new balance of the account we are transferring from.

## 3.6 - Calculate New Balances
@app-post-transfer-route-to-balance Still in `app.js` and in the function body of the post route we are going to calculate the new balances for the account we are transferring to. 

We have several values that have been entered into the HTML form in `transfer.ejs`. Upon form submission the request body will contain `from`, `to`, and `amount`. Current balances are stored in the `accounts` object in this form `accounts[‘checking’].balance`. Using these values calculate the new balance of the account we are transferring from. **Hint: you will need to use `parseInt()`**

## 3.7 - Convert Account Data to JSON
@app-post-transfer-route-write-json Still in `app.js` and in the function body of the post route, convert the `accounts` javascript object to JSON using the stringify function some this JSON in a variable called `accountsJSON`. **Hint: set the replacer argument to `null` and the space argument to 4 of the stringify function for well formatted JSON.**

## 3.8 - Write Account Data to JSON file.
Still in `app.js` and in the function body of the post route, use the `writeFileSync` function of the built-in `fs` library to write the variable `accountsJSON` to the file located at `src/json/accounts.json`. If at any point `accounts.json` gets overwritten copy the JSON from `account_backup.json`. 

## 3.9 - Redirect with a Message
@app-post-transfer-route-redirect Still in `app.js` and in the function body of the post route, render the `transfer` view and pass an object with the following key value pair:

* `message: “Transfer Completed”`

## 3.10 - Add Payment Feature
@app-payment-feature The payment feature of the application is similar to the transfer feature. Add this new feature using this general outline of the steps:

* Near your existing routes in `app.js` create post and get routed with a URL path of `/payment`. The get route should render the `payment` view. 
* In the body of the post route function subtract `req.body.amount` from `accounts[‘credit’].balance` and add it to `accounts[‘credit’].available` (remember to use `parseInt()` when adding).
* Convert the javascript object to JSON and write it to a file.
* In the body of the post route function render the `payment` view and pass an object with the following key value pair, `message: “Payment Successful”`