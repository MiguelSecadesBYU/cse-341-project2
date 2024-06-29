const { validationResult } = require('express-validator');
const Recipe = require('../models/recipe');

exports.getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

exports.getRecipeById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).send('Recipe not found');
    }
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

exports.createRecipe = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};

exports.updateRecipe = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!recipe) {
      return res.status(404).send('Recipe not found');
    }
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

exports.deleteRecipe = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).send('Recipe not found');
    }
    res.status(200).json({ message: 'Recipe deleted' });
  } catch (error) {
    next(error);
  }
};
