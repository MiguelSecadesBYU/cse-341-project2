const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbURI, options)
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Database connection error: ', err));

module.exports = mongoose;
