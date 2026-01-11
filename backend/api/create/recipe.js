const express = require('express');
const router = express.Router();
const Recipe = require('../../models/Recipe');

//create a new recipe
router.post('/', async (req, res) => {
    try {
         //NOTE(zack): create a new recipe
        const title = req.body.title;
        const ingredients = req.body.ingredients;
        const instructions = req.body.instructions;
        const imageURL = req.body.imageURL;
        const createdBy = req.user._id;
        const recipe = new Recipe({ title: title, ingredients: ingredients, instructions: instructions, imageURL : imageURL, createdBy : createdBy });
        await recipe.save();
        res.json(recipe);
    } catch (err) {
        console.error("An exception occurred:\n" + err)
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;