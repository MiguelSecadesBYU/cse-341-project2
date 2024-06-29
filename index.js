const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const recipesRoutes = require('./routes/recipesRoutes');
const ingredientsRoutes = require('./routes/ingredientsRoutes');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/recipes', recipesRoutes);
app.use('/api/ingredients', ingredientsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


  
