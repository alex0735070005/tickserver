var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/**
 * TickSpot Api
 */
var tickApiGetClientsRouter = require('./routes/getClients');
var tickApiGetProjectsRouter = require('./routes/getProjects');
var tickApiGetUsersRouter = require('./routes/getUsers');
var tickApiGetTasksRouter = require('./routes/getTasks');
var tickApiGetTaskRouter = require('./routes/getTask');
var tickApiCreateEntryRouter = require('./routes/createEntry');
var tickApiGetRolesRouter = require('./routes/getRoles');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/**
 * Get clients from TickSpot Api router
 */
app.use('/api/v1/tickspot/clients', tickApiGetClientsRouter);

/**
 * Get projects from TickSpot Api router
 */
app.use('/api/v1/tickspot/projects', tickApiGetProjectsRouter);

/**
 * Get users from TickSpot Api router
 */
app.use('/api/v1/tickspot/users', tickApiGetUsersRouter);

/**
 * Get tasks from TickSpot Api router
 */
app.use('/api/v1/tickspot/tasks', tickApiGetTasksRouter);

/**
 * Get task from TickSpot Api router
 */
app.use('/api/v1/tickspot/tasks', tickApiGetTaskRouter);


/**
 * Create entry from TickSpot Api router
 */
app.use('/api/v1/tickspot/entries', tickApiCreateEntryRouter);

/**
 * Get roles from TickSpot Api router
 */
app.use('/api/v1/tickspot/roles', tickApiGetRolesRouter);






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
