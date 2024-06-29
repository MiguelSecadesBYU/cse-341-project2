const express = require('express');
const ingredientsController = require('../controllers/ingredientsController');
const router = express.Router();

/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Retrieve a list of ingredients
 *     responses:
 *       200:
 *         description: A list of ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingredient'
 */
router.get('/', ingredientsController.getAllIngredients);

/**
 * @swagger
 * /ingredients/{id}:
 *   get:
 *     summary: Retrieve a single ingredient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single ingredient
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Ingredient not found
 */
router.get('/:id', ingredientsController.getIngredientById);

/**
 * @swagger
 * /ingredients:
 *   post:
 *     summary: Create a new ingredient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingredient'
 *     responses:
 *       201:
 *         description: The created ingredient
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       400:
 *         description: Invalid input
 */
router.post('/', ingredientsController.createIngredient);

module.exports = router;
