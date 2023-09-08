// Purpose: Ultimantly we will need to return a JWT from the controller action after the user is added to the database.

const User = require('../../models/user');
const jwt = require('jsonwebtoken');

async function create(req, res) {
    try {
        // adds the user to the database
        const user = await User.create(req.body);
        // token will be a string. After creating the user, a JWT is generated for that user using the `createJWT` function
        const token = createJWT(user);
        // Yes, we can use res.json to send back just a string. The client code needs to take this into consideration
        res.json(token);
    } catch (err) {
        // client will check for non-2xx status codes. 400 = Bad Request
        res.status(400).json(err);
    }
};

function createJWT(user) {
    // the `jwt.sign` function is used to create the JWT. It typically includes the user's data as the payload, a secret key for signing the token, and an experation time.
    return jwt.sign(
        {user},
        process.env.SECRET,
        {expiresIn: '24h'}
    );
};

module.exports = {
    create
};
// create is in an object because we're gonna have multiple things exported.