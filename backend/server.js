var createError = require('http-errors');
var express = require('express');
var cors = require("cors")
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
require("dotenv").config();
require('./config/database.js')

const FRONTENDURL= process.env.FRONTENDURL

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var challengesRouter = require('./routes/challenges');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false, limit: "5mb", } ));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: FRONTENDURL,
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
}))


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/challenges', challengesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
