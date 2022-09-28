// load .env data into process.env
require('dotenv').config();
// Web server config
const sassMiddleware = require('./server/lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const path = require('path');
const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(
  '/styles',
  sassMiddleware({
    source: path.join(__dirname, 'sass'),
    destination: path.join(__dirname, 'public/styles'),
    isSass: true, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// const userApiRoutes = require('./routes/users-api');
// const widgetApiRoutes = require('./routes/widgets-api');
const auth = require('./server/lib/auth');
const indexRoutes = require('./server/routes/api/index');
const itemsRoutes = require('./server/routes/api/items');
const loginRoutes = require('./server/routes/api/login');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use(loginRoutes);
app.use('./server/routes/api/*', auth.verifyToken);
app.use(indexRoutes);
app.use(itemsRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
