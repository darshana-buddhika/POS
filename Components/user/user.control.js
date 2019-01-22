const express = require('express');
const userRouter = express.Router();

const { getToken } = require('../../auth/requiredAuthentication');

const { authenticateUser, getAllUsers } = require('./user.service');

// Sign in & Sign up routes is not protected

userRouter.post('/signin', (req, res) => {

    // Extrac username and the password from the REQUEST body
    const username = req.body.username;
    const password = req.body.password;

    if (username != undefined && password != undefined) {
        console.log(req.body)
        const user_response = authenticateUser(username, password);

        if (user_response.status == 200) {

            getToken(user_response.message)
                .then(sign_token => {

                    user_response.token = sign_token.message;
                    res.json(user_response);
                })
                .catch(err => res.json(token))
        } else {
            res.json(user_response);
        }
    }

});


module.exports = userRouter;