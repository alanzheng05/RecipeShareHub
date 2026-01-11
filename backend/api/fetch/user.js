const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Recipe = require('../../models/Recipe');

//returns username and all recipies the user has made
router.get('/', async (req, res) => {
    try {
        const userInfo = { username: req.user.username, recipes: await Recipe.find({ createdBy: req.user._id })};// NOTE(zack): find all recipes for a user
        res.json(userInfo);
    } catch (err) {
        console.error("An exception occurred:\n" + err)
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
