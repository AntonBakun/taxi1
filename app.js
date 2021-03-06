var express = require('express');
var path = require('path');
var http = require ('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./app/index');
var users = require('./app/users');
var port = process.env.PORT || 8080;
var app = express();


//app.set('port',5000);
//http.createServer(app).listen(app.get('port'),function callback () {
//  console.log('Express server listening on port  '+ app.get('port'));
//});
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('views', path.join( __dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/users', routes);
//app.use('/',db);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    //res.render('Not Found'+ err.status);
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500).send(JSON.stringify(err));
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500).send(JSON.stringify(err));
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.listen(port);


module.exports = app;

