const Recipe = require('../models/recipe');

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).send('Recipe not found');
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!recipe) {
      return res.status(404).send('Recipe not found');
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).send('Recipe not found');
    }
    res.status(200).json({ message: 'Recipe deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
};
