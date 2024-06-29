const Ingredient = require('../models/ingredient');

exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients); // Envía los ingredientes en formato JSON
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getIngredientById = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) {
      return res.status(404).send('Ingredient not found');
    }
    res.status(200).json(ingredient); // Envía el ingrediente en formato JSON
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createIngredient = async (req, res) => {
  try {
    const newIngredient = new Ingredient(req.body);
    await newIngredient.save();
    res.status(201).json(newIngredient); // Envía el nuevo ingrediente en formato JSON
  } catch (error) {
    res.status(400).send(error);
  }
};
