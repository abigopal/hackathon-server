var db = require('../db');
var express = require('express');
var app = module.exports = express();

var loginapi = require('../login-api');

app.set('views', __dirname);
app.set('view engine', 'jade');
app.post('/login', function(req, res){
	console.log('login');
	loginapi.auth(req.body.email, req.body.password, function(success){
		if(success) {
			console.log("login success");
      req.session.email = req.body.email; 
			res.redirect('/mainpage');
		}
		else {
      console.log("login fail")
			res.redirect('/');
		}
	});
});
app.post('/mobile/login', function(req, res){
	loginapi.auth(req.body.email, req.body.password, function(success){
		if(success) {
			req.session.email = req.body.email;
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({success: true}));
		}
		else {
			res.end({success: false});
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({success: false}));
		}
	});
});
app.post('/confirm', function(req, res){
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(req.session));
});
app.post('/mobile/logout', function(req, res){
	req.session.destroy(function(e){
		if(e){
    	  console.log(e);
    	}

  	});
  res.clearCookie('connect.sid', { path: '/' });
  res.end();
});
app.post('/logout', function(req, res){
	req.session.destroy(function(e){
		if(e){
    	  console.log(e);
    	}
    	res.redirect('/');
  	});
  	res.clearCookie('connect.sid', { path: '/' });
});
app.get('/login', function(req, res){
	res.render('login', {title:'login'});
});


