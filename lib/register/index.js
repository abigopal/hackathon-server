var db = require('../db');
var express = require('express');
var app = module.exports = express();

var loginapi = require('../login-api');

app.set('views', __dirname);
app.set('view engine', 'jade');
app.post('/register', function(req, res){
  console.log(req.body.email, req.body.password, req.body.password2, req.body.first, req.body.last, req.body.address);
  loginapi.register(req.body.email, req.body.password, req.body.password2, req.body.first, req.body.last, req.body.address, function(bool){
    console.log(bool);
  });
});
app.get('/register', function(req, res){
	res.render('register', {title:'register'});
});


