const Recipe = require('../models/recipe');

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes); // Envía las recetas en formato JSON
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
    res.status(200).json(recipe); // Envía la receta en formato JSON
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.status(201).json(newRecipe); // Envía la nueva receta en formato JSON
  } catch (error) {
    res.status(400).send(error);
  }
};
