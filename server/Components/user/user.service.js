const User = require('./user.model');
const bcrypt = require('bcrypt');

const Admin  = {
    user_id : "1",
    username : "Admin",
    password : "Admin@123",
    first_name : "Darshana",
    last_name : "Buddhika"
}

// Get all the users in the system
function allUsers() {

}

function authenticatePromise(username, password) {

    if (username == Admin.username && password == Admin.password) {
        const {password, ...user} = Admin;
        return {status : 200, message : user}
    }else {
        return {status: 400, message : "Incorrect Username or Password"}
    }
}

function usernameCheck(username) {
    console.log("check for username")
    return new Promise((resolve, reject) => {
        User.findOne({ username: username }, 'username', (err, user) => {
            if (err) reject({ status: 500, message: err });

            if (user) resolve({ status: 200, message: false });

            resolve({ status: 200, message: true })

        });
    })
}

// errorHandaling function
function handleError(error) {
    console.error(err);
}

module.exports = {
    "authenticateUser": authenticatePromise,
    "getAllUsers": allUsers
}

