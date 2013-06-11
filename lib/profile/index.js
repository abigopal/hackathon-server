var db = require('../db');
var express = require('express');
var app = module.exports = express();

var profileapi = require('../profile-api');

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/profile/:email', function(req, res) {
  profileapi.getProfile(req.params.email, function(success, content){
    if(!success)
      res.redirect('/login');
    else
      res.render('profile', {'content':content});
  });
});
