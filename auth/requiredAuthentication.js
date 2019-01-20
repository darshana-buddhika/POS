const express = require('express');
const protectedRoutes = express.Router();
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

async function createToken(user) {
    jwt.sign({
        user_id = user._id,
        username: user.username,
        first_name: user.first_name,
        second_name: user.second_name
    },
        secret, {
            expiresIn: '24h'
        },
        (err, token) => {
            if (err) console.log('Error happen when creating the token');

            return token;
        });

};

protectedRoutes.use((req, res, next) => {

    // Check if the request header has the token
    const header = req.headers['authorization'];
    if (typeof header != 'undefined') {

        // Extracting the token from the header
        const token = header.split(' ')[1];

        // Verify the token
        if (token) {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    console.log("Invalid JWT");
                    return res.json({
                        "status": false,
                        "message": "JWT not valid"

                    });
                } else {
                    console.log("Token verified!");
                    req.decoded = decoded;
                    next();
                }
            })
        }
    }
    else {
        return res.json({
            "status": 403,
            "message": "JWT not provided"
        });
    }

})



module.exports = protectedRoutes;
module.exports = createToken;