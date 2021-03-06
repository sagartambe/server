var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors')

var usersRouter = require('./routes/users');
var organizationRoute = require('./routes/organization');
var propertyRoute = require('./routes/property');
var regionRoute = require('./routes/region');
var fieldRoute = require('./routes/field');
var cropRoute = require('./routes/crop');
var cropCycleRoute = require('./routes/cropcycle');
var cropCycleFieldRoute = require('./routes/cropcyclefield');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use(bodyParser.json())
app.use(expressValidator())

app.use('/user', usersRouter);
app.use('/organization', organizationRoute);
app.use('/property', propertyRoute);
app.use('/region', regionRoute);
app.use('/field', fieldRoute);
app.use('/crop', cropRoute);
app.use('/cropcycle', cropCycleRoute);
app.use('/cropcyclefield', cropCycleFieldRoute);

const db = require("./models");
db.sequelize.sync();

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

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
