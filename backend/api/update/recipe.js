const express = require('express');
const router = express.Router();
const Recipe = require('../../models/Recipe');

router.put('/', async (req, res) => {
    try {
        const ID = req.body.id;
        const title = req.body.title;
        const ingredients = req.body.ingredients;
        const instructions = req.body.instructions;
        const imageURL = req.body.imageURL;
        const recipe = await Recipe.findOne({_id: ID});
        if(!recipe){
            res.status(404).json({message: "No Recipe Found"})
        }
        recipe.title = title;
        recipe.ingredients = ingredients;
        recipe.instructions = instructions;
        recipe.imageURL = imageURL;
        await recipe.save();
        res.json(recipe);
    } catch (err) {
        console.error("An exception occurred:\n" + err)
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;