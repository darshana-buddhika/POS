const express = require('express');
const app = express()

const { secret, connectionUrl } = require('./config');
const mongoose = require('mongoose');

const auth = require('./auth/requiredAuthentication');

const user = require('./Components/user/user.control');

// MongoDB connection 
mongoose.connect(connectionUrl, { useNewUrlParser: true });

mongoose.Promise = global.Promise;
const db = mongoose.connection;

// Database error handling
db.on('error', (e) => {
    console.log(`Database connection error : ${e}`);
})
    .on('open', () => console.log("Database connected!!"));


// Parse requrest body to JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', user);


module.exports = app