const express = require('express');
const ingredientsController = require('../controllers/ingredientsController');
const router = express.Router();

router.get('/', ingredientsController.getAllIngredients);
router.get('/:id', ingredientsController.getIngredientById);
router.post('/', ingredientsController.createIngredient);

module.exports = router;
