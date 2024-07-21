var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var propertyRouter = require('./routes/properties');
var usersRouter = require('./routes/users');
var reviewsRouter = require('./routes/reviews');
var commentsRouter = require('./routes/comments');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.listen(5000, function () {
    console.log("Server is running on localhost5000");
});

app.use('/api/properties', propertyRouter);
app.use('/api/users', usersRouter);
app.use('/api/reviews', reviewsRouter);
app.use("/api/comments", commentsRouter);

module.exports = app;
