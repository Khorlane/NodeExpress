// *****************
// Meadowlark Travel
// *****************

var express = require('express');
var Fortune = require('./lib/fortune.js');

var app     = express();

// set up handlebars view engine
var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

// Home page
app.get('/', function(req, res)
{
  res.render('home')
});

// About page
app.get('/about', function(req, res)
{
  res.render('about', {Fortune: Fortune.GetFortune()});
});

// Request header info
app.get('/headers', function(req,res){
  res.set('Content-Type','text/plain');
  var s = '';
  for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
  res.send(s);
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next)
{
  res.status(404);
  res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next)
{
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function()
{
  console.log( 'Express started on http://localhost:' +
  app.get('port') + '; press Ctrl-C to terminate.' );
});
