const express = require('express');
const recipesController = require('../controllers/recipesController');
const router = express.Router();

router.get('/', recipesController.getAllRecipes);
router.get('/:id', recipesController.getRecipeById);
router.post('/', recipesController.createRecipe); 

module.exports = router;
