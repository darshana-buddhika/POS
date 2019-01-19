const express = require('express');
const protectedRoutes = express.Router();
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

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