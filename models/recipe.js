const mongoose = require('mongoose');


/**
 * @swagger
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       required:
 *         - name
 *         - ingredients
 *         - instructions
 *         - preparationTime
 *         - cookingTime
 *         - difficulty
 *         - servings
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the recipe
 *         name:
 *           type: string
 *           description: The name of the recipe
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *           description: List of ingredient IDs
 *         instructions:
 *           type: string
 *           description: The instructions for preparing the recipe
 *         preparationTime:
 *           type: integer
 *           description: The preparation time in minutes
 *         cookingTime:
 *           type: integer
 *           description: The cooking time in minutes
 *         difficulty:
 *           type: string
 *           description: The difficulty level of the recipe
 *         servings:
 *           type: integer
 *           description: The number of servings
 *       example:
 *         name: Asturian Fabada
 *         ingredients: ["6680430401f5e83ac366a48f", "6680430401f5e83ac366a490"]
 *         instructions: Start by soaking the fabes overnight. Cook all meats with onion and garlic, then add the beans and saffron.
 *         preparationTime: 30
 *         cookingTime: 120
 *         difficulty: Medium
 *         servings: 4
 */


const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
  instructions: { type: String, required: true },
  preparationTime: { type: Number, required: true },
  cookingTime: { type: Number, required: true },
  difficulty: { type: String, required: true },
  servings: { type: Number, required: true }
}, { collection: 'Recipes' }); 

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
