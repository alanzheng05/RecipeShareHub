const User = require("../models/User");

async function verifyUserSession(req, res, next) {
    try {
        const user = await User.findOne({ token: req.cookies['auth'] });

        if (!user) {
            return res.status(401).json({ message: "User is not authenticated" });
        }

        // Attach user info to the request
        req.user = user;
        next(); // Allow request to continue
    } catch (error) {
        console.error("An exception occurred:\n" + error)
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = verifyUserSession;
