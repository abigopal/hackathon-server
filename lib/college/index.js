var db = require('../db');
var express = require('express');
var app = module.exports = express();


app.set('views', __dirname);
app.set('view engine', 'jade');

var collegeapi = require('../college-api');

app.post('/addacollege', function(req, res){
 collegeapi.register(req.body.college, req.body.email, req.body.address, function(bool){
    console.log(bool);
  }); 
});
app.post('/search', function(req, res){
  collegeapi.search(req.body.college, req.body.date, function(bool, data){
    res.render('/gettrips', {'data':data});  
  }); 
});

app.get('/addacollege', function(req, res){
  res.render('addacollege', {});
});
