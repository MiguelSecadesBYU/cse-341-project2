const mongoose = require('mongoose');

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
