const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true }
}, { collection: 'Ingredients' }); 

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
