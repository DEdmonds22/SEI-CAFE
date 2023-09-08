const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function createJWT(user) {
    return jwt.sign(
        {user},
        process.env.SECRET,
        {expiresIn: '24h'}
    );
};

async function create(req, res) {
    try {
        const user = await User.create(req.body);
        const token = createJWT(user);
        res.status(200).json(token);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};

async function login(req, res) {
    try {
        User.findOne({ email: req.body.email })
            .then(foundUser => {
                if (foundUser) {
                    bcrypt.compare(req.body.password, foundUser.password, (error, result) => {
                        if (error) {
                            console.log(error);
                            res.status(400).json(error);
                        } else {
                            if (result === true) {
                                const token = createJWT(foundUser);
                                res.status(200).json(token);
                            } else {
                                res.status(403).json({ error: 'Invalid password!' });
                            };
                        };
                    });
                } else {
                    res.status(404).json({ error: 'User not found '});
                };
            });

    } catch(error) {
        res.status(400).json({ error });
    };
};

function checkToken(req, res) {
    console.log('req.user', req.user);
    res.status(200).json(req.exp);
}


module.exports = {
    create,
    login,
    checkToken
};