var db = require('../db');
var http = require('http');

exports.getProfile = function(email, fn){
  db.view('rideshark', 'getUser', {key:email}, function(e, b, h){
    if(e) console.log(e);
    var r = b.rows;
    console.log(r);
    if(r.length == 0){
      fn(false, null);
     }
    else {
      fn(true, r[0].value);
    }
  });
};

exports.changePassword = function(email, newpassword, newpasswordconf){

};
