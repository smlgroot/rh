/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  user = require('./routes/user'),
  http = require('http'),
  path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/modals', routes.modals);
app.get('/users', user.list);
app.get('/webgl', function(req, res) {
  res.sendfile(__dirname + '/views/webgl.html');
});

var httpServer = http.createServer(app).listen(app.get('port'), "0.0.0.0", function() {
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io')(httpServer);
io.on('connection', function(socket) {
  socket.emit('news', {
    hello: 'world'
  }); 
  socket.on('my other event', function(data) {
    console.log(data);
  });
});
