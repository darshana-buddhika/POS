const express = require('express');
const app = express()

const { secret, connectionUrl } = require('./config');
const mongoose = require('mongoose');

const auth = require('./auth/requiredAuthentication');

// MongoDB connection 
mongoose.connect(connectionUrl);

mongoose.Promise = global.Promise;
const db = mongoose.connection;

// Database error handling
db.on('error',  (e) => {
    console.log(`Database connection error : ${e}`);
});


// Parse requrest body to JSON
app.use(express.json());

app.use('/api', auth);


module.exports = app