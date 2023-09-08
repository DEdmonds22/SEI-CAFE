// Purpose: Ultimantly we will need to return a JWT from the controller action after the user is added to the database.

const User = require('../../models/user');

async function create(req, res) {
    try {
        // adds the user to the database
        const user = await User.create(req.body);
    } catch (err) {
        // client will check for non-2xx status codes. 400 = Bad Request
        res.status(400).json(err);
    }
};

module.exports = {
    create
};
// create is in an object because we're gonna have multiple things exported.