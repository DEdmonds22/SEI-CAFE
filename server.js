require('dotenv').config();
require('./config/database');

/* Code the Skeleton Express App */
// Create & Code the Express Server //
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());

// mount & configure the serve-favicon & static middleware
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(require('./config/checkToken'));

/* Mount the Router */
// `/api/users` our BASE_URL / api endpoint in the users-api.js file. `./routes/api/users` is calling/refering to using the routes in that users.js file if the request route `/api/users` matches.
app.use('/api/users', require('./routes/api/users'));

/* Defines the "Catch All" Route */
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// sets port for development to 3001, so the React's dev server can continue to use 3000
const port = process.env.PORT || 3001;
// this tells the Express app to listen for incoming request
app.listen(port, () => {
    console.log(`Express app is running on port ${port}...`);
});