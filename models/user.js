// Purpose: to save the user to the DB when they sign up and retrieve the user from the DB to validate their creditentials when they log in.

const { Schema, model } = require('mongoose');
// this variable determines how much processing time it will take to perform the hash; 6 is a reasonable value
const SALT_ROUNDS = 6;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        minLength: 3,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password;
            return ret;
        }
    }
});

// this middleware is triggered when the save operation is called on a user document, typically when a new user is being created or when an existing user updates their information, including their password.
userSchema.pre('save', async function(next) {
    // `this` is the user doc. Calling `next()` signals to Mongoose that it can proceed with the save operation. If the password hasnt be modified/changed then the save operation can proceed as usual
    if (!this.isModified('password')) return next();

    // update the password with the computed hash. If the `password` field has been modified, the middleware procceds to use `bcrypt` library to has the password before saving it to the database. Salting adds randomness to the has, making it more secure against certain types of attacks. After hashing the password (if it was modified), the middleware calls `next()` to indicate it completed its take and the save operation can continue.
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
});

module.exports = model('User', userSchema);