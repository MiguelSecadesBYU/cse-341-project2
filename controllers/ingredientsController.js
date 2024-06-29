const Ingredient = require('../models/ingredient');

exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    console.log("Ingredients:", ingredients); 
    res.status(200).json(ingredients);
  } catch (error) {
    console.error("Error fetching ingredients:", error); 
    res.status(500).send(error);
  }
};

exports.getIngredientById = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) {
      return res.status(404).send('Ingredient not found');
    }
    console.log("Ingredient by ID:", ingredient); 
    res.status(200).json(ingredient);
  } catch (error) {
    console.error("Error fetching ingredient by ID:", error); 
    res.status(500).send(error);
  }
};

exports.createIngredient = async (req, res) => {
  try {
    const newIngredient = new Ingredient(req.body);
    await newIngredient.save();
    console.log("New ingredient created:", newIngredient); 
    res.status(201).json(newIngredient);
  } catch (error) {
    console.error("Error creating ingredient:", error); 
    res.status(400).send(error);
  }
};
