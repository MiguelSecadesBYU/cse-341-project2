const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const recipesRoutes = require('./routes/recipesRoutes');
const ingredientsRoutes = require('./routes/ingredientsRoutes');
const swagger = require('./swagger');
const passport = require('passport');
const session = require('express-session');
require('./config/passportConfig');

const app = express();

app.use(cors({
  origin: 'https://cse-341-project2-rq9t.onrender.com',
  optionsSuccessStatus: 200
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(session({ secret: 'yourSecretKey', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/recipes', recipesRoutes);
app.use('/ingredients', ingredientsRoutes);

// Setup Swagger
swagger(app);

app.get('/', (req, res) => {
  res.send('Welcome to the Recipe Management API!');
});

/**
 * @swagger
 * /auth/github:
 *   get:
 *     summary: Authenticate with GitHub
 *     responses:
 *       302:
 *         description: Redirects to the GitHub authentication page
 */
app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     summary: GitHub authentication callback
 *     responses:
 *       302:
 *         description: Redirects based on authentication result
 */
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Log out
 *     responses:
 *       302:
 *         description: Redirects to the home page
 */
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user profile
 *     responses:
 *       200:
 *         description: Returns the authenticated user's profile
 *       302:
 *         description: Redirects to the home page if not authenticated
 */
app.get('/profile', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.username}`);
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
