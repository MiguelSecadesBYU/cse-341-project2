const express = require('express');
const { body, param } = require('express-validator');
const recipesController = require('../controllers/recipesController');
const router = express.Router();

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Retrieve a list of recipes
 *     responses:
 *       200:
 *         description: A list of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 */
router.get('/', recipesController.getAllRecipes);

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Retrieve a single recipe by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single recipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Recipe not found
 */
router.get('/:id', 
  param('id').isMongoId().withMessage('Invalid recipe ID'),
  recipesController.getRecipeById
);

/**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Create a new recipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       201:
 *         description: The created recipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: Invalid input
 */
router.post('/', 
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('ingredients').isArray({ min: 1 }).withMessage('Ingredients should be an array with at least one element'),
  body('instructions').isString().notEmpty().withMessage('Instructions are required'),
  body('preparationTime').isInt({ min: 0 }).withMessage('Preparation time must be a non-negative integer'),
  body('cookingTime').isInt({ min: 0 }).withMessage('Cooking time must be a non-negative integer'),
  body('difficulty').isString().notEmpty().withMessage('Difficulty is required'),
  body('servings').isInt({ min: 1 }).withMessage('Servings must be at least 1'),
  recipesController.createRecipe
);

/**
 * @swagger
 * /recipes/{id}:
 *   put:
 *     summary: Update a recipe
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       200:
 *         description: The updated recipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Recipe not found
 */
router.put('/:id', 
  param('id').isMongoId().withMessage('Invalid recipe ID'),
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('ingredients').isArray({ min: 1 }).withMessage('Ingredients should be an array with at least one element'),
  body('instructions').isString().notEmpty().withMessage('Instructions are required'),
  body('preparationTime').isInt({ min: 0 }).withMessage('Preparation time must be a non-negative integer'),
  body('cookingTime').isInt({ min: 0 }).withMessage('Cooking time must be a non-negative integer'),
  body('difficulty').isString().notEmpty().withMessage('Difficulty is required'),
  body('servings').isInt({ min: 1 }).withMessage('Servings must be at least 1'),
  recipesController.updateRecipe
);

/**
 * @swagger
 * /recipes/{id}:
 *   delete:
 *     summary: Delete a recipe
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe deleted
 *       404:
 *         description: Recipe not found
 */
router.delete('/:id', 
  param('id').isMongoId().withMessage('Invalid recipe ID'),
  recipesController.deleteRecipe
);

module.exports = router;
