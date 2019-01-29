const express = require('express');
const app = express()

const { secret, connectionUrl } = require('./config');
const mongoose = require('mongoose');

const { authRoute } = require('./auth/requiredAuthentication');

const user = require('./Components/user/user.control');
const order = require('./Components/order/order.control');

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
// app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Authorization,Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/api/user', user);
app.use(authRoute)
app.use('/api/order', order);



module.exports = app