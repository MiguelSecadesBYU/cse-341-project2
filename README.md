# Recipe Management API

This is a Node.js REST API for managing recipes and ingredients. It allows users to create, read, update, and delete recipes and ingredients. The API is built with Express.js and MongoDB, and it uses Mongoose for database operations. Swagger is used for API documentation.

## Features

- Create, read, update, and delete recipes
- Create, read, update, and delete ingredients
- Validation of input data
- Error handling
- API documentation with Swagger

## Prerequisites

- Node.js
- MongoDB

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MiguelSecadesBYU/cse-341-project2.git

2. Install dependencies:
   ```bash
   cd cse-341-project2
   npm install
   
4. Create a .env file in the root directory and add your MongoDB URL::
  PORT=3000
  MONGODB_URL=your_mongodb_connection_string

## Running the API
To start the server in development mode with nodemon:
  npm run dev

To start the server in production mode:
  npm start
The server will be running on http://localhost:3000.

## API Endpoints
Recipes
 * GET /recipes: Retrieve all recipes
 * GET /recipes/:id: Retrieve a single recipe by ID
 * POST /recipes: Create a new recipe
 * PUT /recipes/:id: Update a recipe by ID
 * DELETE /recipes/:id: Delete a recipe by ID

Ingredients
 * GET /ingredients: Retrieve all ingredients
 * GET /ingredients/:id: Retrieve a single ingredient by ID
 * POST /ingredients: Create a new ingredient
 * PUT /ingredients/:id: Update an ingredient by ID
 * DELETE /ingredients/:id: Delete an ingredient by ID

## Validation
The API uses express-validator for input validation to ensure data integrity and to provide meaningful error messages.

## Error Handling
Errors are handled gracefully and appropriate HTTP status codes are returned. Error details are logged to the console.

## API Documentation
Swagger is used for API documentation. Once the server is running, you can access the API documentation at http://localhost:3000/api-docs.

## Project Structure
.
├── controllers
│   ├── ingredientsController.js
│   └── recipesController.js
├── models
│   ├── ingredient.js
│   └── recipe.js
├── routes
│   ├── ingredientsRoutes.js
│   └── recipesRoutes.js
├── .env
├── index.js
├── package.json
└── swagger.js

## Author
Miguel Secades García

## Course
CSE 341 Web Services - Brigham Young University - Idaho
