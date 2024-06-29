const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Importa el paquete CORS
require('dotenv').config();
const recipesRoutes = require('./routes/recipesRoutes');
const ingredientsRoutes = require('./routes/ingredientsRoutes');
const swagger = require('./swagger');

const app = express();
app.use(cors());  // Usa el middleware CORS
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/recipes', recipesRoutes);
app.use('/ingredients', ingredientsRoutes);

// Setup Swagger
swagger(app);

app.get('/', (req, res) => {
  res.send('Welcome to the Recipe Management API!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
