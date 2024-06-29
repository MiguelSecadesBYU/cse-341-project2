const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true }
}, { collection: 'Ingredients' });

/**
 * @swagger
 * components:
 *   schemas:
 *     Ingredient:
 *       type: object
 *       required:
 *         - name
 *         - amount
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the ingredient
 *         name:
 *           type: string
 *           description: The name of the ingredient
 *         amount:
 *           type: string
 *           description: The amount of the ingredient
 *       example:
 *         name: Paprika
 *         amount: 2 teaspoons
 */

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
