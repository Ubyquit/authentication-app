const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// Database connection
const dbURI = 'mongodb://localhost/authenticate-app';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(3000))
  .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.use('/auth', authRoutes);

// Error middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Something went wrong');
});
