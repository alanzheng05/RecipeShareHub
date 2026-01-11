const express = require('express');
const router = express.Router();
const Recipe = require('../../models/Recipe');

//returns all recipies
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find(); // NOTE(zack): find all recipes
        res.json(recipes);
    } catch (err) {
        console.error("An exception occurred:\n" + error)
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;