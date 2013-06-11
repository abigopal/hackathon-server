
var db = require('../db');
var express = require('express');
var app = module.exports = express();

var tripapi = require('../trip-api');

app.set('views', __dirname);
app.set('view engine', 'jade');

app.post('/mobile/maketrip', function(req, res){
  tripapi.addEvent(req.body.email, req.body.capacity, req.body.college, req.body.date, function(s){
    console.log(s);
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({success: s}));
  });
});
app.post('/mobile/adduser', function(req, res){
  tripapi.addUser(req.body.eventid, req.body.email, function(s){
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({success: s}));
  });
});
app.post('/gettrips', function(req, res){
  console.log(req.body.college, req.body.date);
  tripapi.search(req.body.college, req.body.date, function(bool, data){
     res.render('gettrips', {'data': data});
  });
});
app.post('/mobile/search', function(req, res){
  tripapi.search(req.body.college, req.body.date, function(bool, data){
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify({'data':data}));
  });
});
app.get('/needatrip', function(req, res){
  res.render('needatrip', {});
});
app.get('/trip/:id', function(req, res){
  db.view('rideshark', 'getTrip', {key: req.params.id}, function(e, b, h){
     if(e) console.log(e);
     var r = b.rows;
     if(r.length == 0)
       res.redirect('/');
     res.render('tripinfo', {'data': r[0].value});
  });
});
