const express = require('express');
const router = express.Router();
const Recipe = require('../../models/Recipe');

//NOTE(zack): delete a recipe
router.delete('/', async (req, res) => {
    try {
        const ID = req.body.uniqueID;
        console.log(ID);
        const recipe = await Recipe.findOne({_id: ID});
        if(!recipe){
            return res.status(404).json({message: "No Recipe Found"})
        }
        await Recipe.deleteOne({_id: ID});
        res.json({ message: "Recipe deleted" });
    } catch (err) {
        console.error("An exception occurred:\n" + err)
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;