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

async function login(req, res) {
    // we need the try catch block so that if there is an error anywhere in our function, the program keeps going instead of crashing!
    try {

        // this is a findOne for a single user matching the email that was input into the login form
        const user = await User.findOne({ email: req.body.email })

        // after the findOne completes, we do this next...
        .then(foundUser => {

            // note: findOne will not error if there is no user found, instead it just sets foundUser to undefined. Therefore, we have to check if a  user was found.
            if (foundUser) {

                //if a user was found, we then compare the password they entered in the login form with the password stored in the database. We don't have to input the salt because the hash in the database also contains a key used to rehash a new password for comparison.
                bcrypt.compare(req.body.password, foundUser.password, (error, result) => {
                    
                    // if there was an error in the compare, this runs...
                    if (error) {
                        console.log(error);
                        res.status(400).json(error);

                        //if there was an error, this runs (important: the password being wrong doesn;t count as an error!)
                    } else {

                        // if the passwords match...
                        if (result === true) {
                            
                            // create a tooken using the info that we found initally
                            const token = createJWT(foundUser);

                            // sends back a status code of 200 (ok) as well as the token that we just created
                            res.status(200).json(token);

                            // if the passwords don't match
                        } else {

                            // sends back a status code of 403 (invalid password) as well as a message stating why
                            res.status(403).json({ error: 'Invalid password!' });
                        };
                    };
                });
                
                // if a user was not found matching email provided
            } else {

                // sends back a 404 error code which means no user was found
                res.status(404).json({ error: 'User not found '});
            };
        });

        // if any program breaking error happens inside of the try block, this code runs here and the program continues as normal.
    } catch {
        res.status(400).json({ error });
    };
};

function checkToken(req, res) {
    // req.user will always be there for you when a token is sent
    console.log('req.user', req.user);
    res.json(req.exp);
}


module.exports = {
    create,
    login,
    checkToken
};
// create is in an object because we're gonna have multiple things exported.