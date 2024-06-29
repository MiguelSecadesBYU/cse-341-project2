const express = require('express');
const { body, param } = require('express-validator');
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
router.get('/:id', 
  param('id').isMongoId().withMessage('Invalid ingredient ID'),
  ingredientsController.getIngredientById
);

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
router.post('/', 
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('amount').isString().notEmpty().withMessage('Amount is required'),
  ingredientsController.createIngredient
);

/**
 * @swagger
 * /ingredients/{id}:
 *   put:
 *     summary: Update an ingredient
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
 *             $ref: '#/components/schemas/Ingredient'
 *     responses:
 *       200:
 *         description: The updated ingredient
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Ingredient not found
 */
router.put('/:id', 
  param('id').isMongoId().withMessage('Invalid ingredient ID'),
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('amount').isString().notEmpty().withMessage('Amount is required'),
  ingredientsController.updateIngredient
);

/**
 * @swagger
 * /ingredients/{id}:
 *   delete:
 *     summary: Delete an ingredient
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ingredient deleted
 *       404:
 *         description: Ingredient not found
 */
router.delete('/:id', 
  param('id').isMongoId().withMessage('Invalid ingredient ID'),
  ingredientsController.deleteIngredient
);

module.exports = router;
