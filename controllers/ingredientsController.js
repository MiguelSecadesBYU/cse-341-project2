const { validationResult } = require('express-validator');
const Ingredient = require('../models/ingredient');

exports.getAllIngredients = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    next(error);
  }
};

exports.getIngredientById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) {
      return res.status(404).send('Ingredient not found');
    }
    res.status(200).json(ingredient);
  } catch (error) {
    next(error);
  }
};

exports.createIngredient = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newIngredient = new Ingredient(req.body);
    await newIngredient.save();
    res.status(201).json(newIngredient);
  } catch (error) {
    next(error);
  }
};

exports.updateIngredient = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const ingredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!ingredient) {
      return res.status(404).send('Ingredient not found');
    }
    res.status(200).json(ingredient);
  } catch (error) {
    next(error);
  }
};

exports.deleteIngredient = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
    if (!ingredient) {
      return res.status(404).send('Ingredient not found');
    }
    res.status(200).json({ message: 'Ingredient deleted' });
  } catch (error) {
    next(error);
  }
};
