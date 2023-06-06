var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var imageRouter = require('./routes/image_detail');
var predictionRouter = require('./routes/predictions');
var resultRouter = require('./routes/result_detail');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/image', imageRouter);
app.use('/prediction', predictionRouter);
app.use('/result', resultRouter);

module.exports = app;
