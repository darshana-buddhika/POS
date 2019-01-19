const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const user = new Schema(
    {
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        created_date: { type: Date, default: Date.now() }

    }
);


// Hash the password before saving the user
user.pre('save', (next) => {
    if (this.password && this.isModified('password')) {
        bcrypt.hash(this.password, saltRounds, (err, hash) => {
            if (err) {
                // If error occurs set the password to null
                console.error("Error occurd while hashing the password!");
                this.password = "";

            } else {

                // Replace the plain text password with the HASH
                this.password = hash;
            }
        });
    }
});

module.exports = mongoose.model('User', user);