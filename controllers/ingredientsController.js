const Ingredient = require('../models/ingredient');

exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
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
    res.status(200).json(ingredient);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createIngredient = async (req, res) => {
  try {
    const newIngredient = new Ingredient(req.body);
    await newIngredient.save();
    res.status(201).json(newIngredient);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!ingredient) {
      return res.status(404).send('Ingredient not found');
    }
    res.status(200).json(ingredient);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
    if (!ingredient) {
      return res.status(404).send('Ingredient not found');
    }
    res.status(200).json({ message: 'Ingredient deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
};
