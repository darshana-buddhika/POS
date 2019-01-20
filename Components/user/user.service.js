const User = require('./user.model');
const bcrypt = require('bcrypt');

// Authenticate a user
async function authenticate(username, password) {

    User.find({ username: username }, (err, user) => {
        if (err) handleError(err);

        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) return { status: true, message: user };

            return { status: false, message: "wrong password" }

        } else {
            return {status: false, message : "user not found"}
        }
    });

}

// Get all the users in the system
function allUsers() {

}

// Adding a new user
async function insertUser(user) {
    const new_user = new User(user);
    new_user.save((err, user) => {
        if (err) handleError(err)
        return user;
    });
}

// Check user name availability
async function user(username) {
    console.log("checking username availability " + username)
    User.findOne({ username: username }, 'username', (err, user) => {

        if (err) handleError(err);
        return user;

    });
}

// errorHandaling function
function handleError(error) {
    console.error(err);
}

module.exports = {
    "authenticateUser": authenticate,
    "getAllUsers": allUsers,
    "checkUsernameAvailability": user,
    "saveUser": insertUser
}