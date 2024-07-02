var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var propertyRouter = require('./routes/properties');
var reviewsRouter = require('./routes/reviews');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/api/property', propertyRouter);
app.use('/api/reviews', reviewsRouter)
app.use('/api/users', usersRouter);

module.exports = app;
