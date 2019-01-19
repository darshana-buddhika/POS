const express = require('express');
const router = express.Router();

const protectedRoute = require('../../auth/requiredAuthentication');

const { authenticateUser, getAllUsers, checkUsernameAvailability, saveUser } = require('./user.service');

// Sign in & Sign up routes is not protected

router.get('/test', (req, res) => {
    res.json({
        message: "test"
    })
})

router.post('/signin', (req, res) => {
    const username = req.params.username;
    const password = req.params.password;

});

router.post('/signup', (req, res) => {

    // Console.log(req)
    const username = req.body.username;
    const password = req.body.password;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;

    // User input validation
    if (username != undefined && password != undefined && first_name != undefined && last_name != undefined) {

        if (checkUsernameAvailability(username)) {
            const user = {
                'username': username,
                'password': password,
                'first_name': first_name,
                'last_name': last_name
            }

            console.log("Saving new user :" + JSON.stringify(user))
            const new_user = saveUser(user);

            if (new_user) {
                res.json({
                    status: true,
                    user: new_user
                });
            } else {
                res.json({
                    status: false,
                    message: ""
                })
            }
        }
    } else {
        res.json({
            status: false,
            message: "User details not provided"
        })
    }
});

// All the other routes are protected

router.use(protectedRoute);



module.exports = router;