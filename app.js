const express = require('express');
const app = express()

const auth = require('./auth/requiredAuthentication');

app.use(express.json());


app.use('/api', auth);

app.get('/api/name',(req,res) => {
    res.send('Hello From The API..');
}); 
module.exports = app