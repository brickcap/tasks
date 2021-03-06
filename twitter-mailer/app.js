var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var consolidate =require("consolidate");
var routes = require('./routes/index');
var user = require('./routes/users');
var app = express();
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 8080});

// view engine setup
app.engine("html",consolidate.mustache);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/send',user);
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send(err);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.listen(3000,function(){
    console.log("twitter mailer is working on port 3000");
});

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
	console.log(message);
	return require('./aggregate_tweets').agg(null,ws);
    });
   
});

module.exports = app;
