// Purpose: Ultimantly we will need to return a JWT from the controller action after the user is added to the database.

function create(req, res) {
    res.status(200).json({
        user: {
            name: req.body.name,
            email: req.body.email
        }
    });
};

module.exports = {
    create
};
// create is in an object because we're gonna have multiple things exported.