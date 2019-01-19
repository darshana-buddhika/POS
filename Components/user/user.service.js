const User = require('./user.model');

// Authenticate a user
function authenticate(username, password) {

}

// Get all the users in the system
function allUsers() {

}

// Adding a new user
async function insertUser(user) {
    const new_user = new User(user);
    new_user.save((err) => {
        if (err) handleError(err)
        return true;
    });
}

// Check user name availability
async function user(username) {
    console.log("checking username availability " + username)
    User.findOne({ username: username }, 'username', (err, user) => {

        if (err) {
            console.error('Error ocured while checking for username validity');

        } else if (user) {

            console.log(user)
            return false;

        } else {
            return true;

        }
    });
}

module.exports = {
    "authenticateUser": authenticate,
    "getAllUsers": allUsers,
    "checkUsernameAvailability": user,
    "saveUser": insertUser
}