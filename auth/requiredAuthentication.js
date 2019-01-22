
const jwt = require('jsonwebtoken');
const { secret } = require('../config');



// Check if the request header has the token
function protectedRoutes(req, res, next) {
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
                        "status": 401,
                        "message": "token not valied"

                    });
                } else {
                    console.log("Token verified!");
                    req.decoded = decoded;
                    return next();
                }
            })
        }
    }
    else {
        res.json({
            "status": 403,
            "message": "JWT not provided"
        });
    }

}

// Creating a new auth token
function createToken(user) {
    return new Promise((resolve, reject) => {
        jwt.sign({
            user_id : user.id,
            username: user.username,
            first_name: user.first_name,
            second_name: user.second_name
        },
            secret, {
                expiresIn: '24h'
            },
            (err, token) => {
                if (err) reject({ status: 500, message: "Error occured while sign the token" });

                resolve({ status: 200, message: token });
            });
    })
};



module.exports = {
    "authRoute": protectedRoutes,
    "getToken": createToken
}
