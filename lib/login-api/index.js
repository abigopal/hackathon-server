var db = require('../db');
var http = require('http');
var gm = require('googlemaps');
exports.auth = f = function(email, password, fn){
	db.view('rideshark', 'getUser', {key: email}, function(e, b, h){
		if(e) console.log(e);
		else {
			var r = b.rows;
			var t = b.total_rows;

			if(r.length == 0){
				fn(false);
			}
			else { 
				if(password == r[0].value.password){
					fn(true);
				}
				else {
					fn(false);
				}
			}
		}
	});
};
exports.register = g = function(email, pass1, pass2, first, last, address, fn) {
  db.view('rideshark', 'getUser', {key: email}, function(e, b, h){
		var r = b.rows;
		var t = b.total_rows;
		if(r.length != 0 || pass1 != pass2){
       console.log(pass1, pass2);
		   fn(false);
      }
    else { 
			  gm.geocode(address, function(err, result){ 
          naddress = {};
          naddress['lat'] = result.results[0].geometry.location.lat;
          naddress['long'] = result.results[0].geometry.location.lng;
          naddress['addr'] = result.results[0].formatted_address;
          db.insert({'type':'user','email': email, 'password': pass1, 'first':first, 'last':last, 'address':naddress}, email, function(e1, b1){
            if(e1) console.log(e1);
            fn(true); 
			    });
       });
    }
	});
};
//g("adfaa@gmail.com", "asdf", "asdf", "dkasfa", "adfa", "43554 Freeport Pl Dulles VA 20166", function(bool) {console.log(bool)});
