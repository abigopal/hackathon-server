var db = require('../db');
var http = require('http');
var gm = require('googlemaps');
exports.register = g = function(college, email, address, fn) {
  db.view('rideshark', 'getCollege', {key: email}, function(e, b, h){
  if(e) console.log(e);
  else {
    var r = b.rows;
		var t = b.total_rows;
		if(r.length != 0){
		  fn(false);
    }
    else { 
		  gm.geocode(address, function(err, result){ 
      naddress = {};
      naddress['lat'] = result.results[0].geometry.location.lat;
      naddress['long'] = result.results[0].geometry.location.lng;
      naddress['addr'] = result.results[0].formatted_address;
      db.insert({'type':'college', 'college': college, 'email':email, 'address':naddress}, email, function(e1, b1){
        if(e1) console.log(e1);
        fn(true); 
			});
     });
    }
    }
	});
};
