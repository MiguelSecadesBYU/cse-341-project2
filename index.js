const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const recipesRoutes = require('./routes/recipesRoutes');
const ingredientsRoutes = require('./routes/ingredientsRoutes');

const app = express();
app.use(express.json()); // Middleware para analizar cuerpos JSON

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Rutas
app.use('/recipes', recipesRoutes);
app.use('/ingredients', ingredientsRoutes);

// Ruta básica para la raíz
app.get('/', (req, res) => {
  res.send('Welcome to the Recipe Management API!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
