const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const crypto = require('crypto');

router.post('/', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        let user = await User.findOne({ username: username });

        if (user != null) {
            res.status(500).json({ message: 'User already exists' });
            return
        }

        // NOTE(alex): unique salt per password
        const salt = crypto.randomBytes(16).toString("hex");
        const passwordHash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
        const token = crypto.randomBytes(32).toString("hex");

        user = new User({username: username, password: passwordHash, salt: salt, token: token})
        await user.save();
        
        res.cookie("auth", user.token, {
            httpOnly: true,
            secure: true,
            domain: req.hostname,
            maxAge: 24 * 60 * 60 * 1000 // NOTE(alex): keep the user logged in for 24 hours
        });

        res.status(200);
    } catch (err) {
        console.error("An exception occurred:\n" + error)
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;