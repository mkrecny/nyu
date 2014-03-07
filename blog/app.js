
/**
 * Module dependencies.
 */

var port = process.argv[2] || 80;

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/reqlog', routes.reqlog);
app.get('/:view', routes.view);
app.get('/mudex', routes.mudex);
app.get('/class/:class', routes.class);
app.get('/class/:class/week/:week', routes.week);
app.get('/class/:class/week/:week/assignment/:assignment', routes.assignment);
app.get('/thoughts/:thought', routes.thought);

app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
