
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);

app.set('views', __dirname + '/views');
//app.engine('html', swig);
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser(':D :D :D :D'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./lib/login'));
app.use(require('./lib/register'));
app.use(require('./lib/profile'));
app.use(require('./lib/trip'));
app.use(require('./lib/college'));
app.use(require('./lib/trip'));
app.use(require('./lib/static'));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/raw/:file', function(req, res){
  res.redirect('/' + req.params.file, {});
});
http.createServer(app);
app.listen(80, '198.199.85.63', function(){
console.log("working");
}); 
