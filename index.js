const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const recipesRoutes = require('./routes/recipesRoutes');
const ingredientsRoutes = require('./routes/ingredientsRoutes');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/recipes', recipesRoutes);
app.use('/ingredients', ingredientsRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Recipe Management API!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

