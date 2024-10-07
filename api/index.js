var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

mongoose.Promise = global.Promise;
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('connection successfully!'))
  .catch((err) => console.error('can not connect :',err))

var app = express();
var customersRouter = require('../api/routes/customers');
var userRoutes = require('../api/routes/users');
// const products = require('../api/rest/products');

app.get('/', function(req, res, next) {
    const currentTime = new Date();
    res.send(`This is my API MIA running... Current time: ${currentTime}`);
});
  
app.get('/heatcheck', function(req, res, next) {
    const currentTime = new Date();
    res.send(`This is my about route. Current time: ${currentTime}`);
});
  
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', userRoutes);
app.use('/api/customers', customersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
