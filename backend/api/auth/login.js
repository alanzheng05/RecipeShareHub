const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const crypto = require('crypto');

router.post('/', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const user = await User.findOne({ username: username });

        if (user == null) {
            res.status(403).json({ message: 'User not found' });
            return
        }

        // NOTE(alex): derive the password hash from the user's unique salt
        passwordHash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');

        if (user.password != passwordHash) {
            res.status(403).json({ message: 'Password mismatch' });
            return
        }

        res.cookie("auth", user.token, {
            httpOnly: true,
            secure: true,
            domain: req.hostname,
            maxAge: 24 * 60 * 60 * 1000 // NOTE(alex): keep the user logged in for 24 hours
        });

        // NOTE(alex): we don't send anything back because the token is placed within a cookie
        res.status(200).json();
    } catch (err) {
        console.error("An exception occurred:\n" + error)
        res.status(403).json({ message: err.message });
    }
});

module.exports = router;