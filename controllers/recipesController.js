const Recipe = require('../models/recipe');

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error); 
    res.status(500).send(error);
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).send('Recipe not found');
    }
    console.log("Recipe by ID:", recipe); 
    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error fetching recipe by ID:", error); 
    res.status(500).send(error);
  }
};

exports.createRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    console.log("New recipe created:", newRecipe); 
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Error creating recipe:", error); 
    res.status(400).send(error);
  }
};
