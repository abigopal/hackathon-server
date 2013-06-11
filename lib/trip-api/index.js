var db = require('../db');
var geolib = require('geolib');
exports.addUser = a = function(eventID, email, fn){
  db.view('rideshark', 'getTrip', {key: eventID}, function(e, b, h){
    var r = b.rows[0].value;
    var t = b.total_rows;
    console.log(r);
    if(e)
      console.log(e);
    if(!r)
      fn(false);
    else {
      db.view('rideshark', 'getUser', {key: email}, function(e1, b1, h1){
      var user = b1.rows[0].value;
      var flong = r.to[0].long;
      var flat = r.to[0].lat;
      var tlong = user.address.long;
      var tlat = user.address.lat;

      var dist = geolib.getDistanceSimple({latitude: flat, longitude: flong }, {latitude: tlat , longitude: tlong}); 
      r['waitlist'].push({'email': email, 'addr': user.address.addr, 'dist':dist});
      db.insert(r, r._id, function(e, b){
        if(e) console.log(e);
        fn(true);
      });
      });
    }
  });  
};
exports.search = c = function(college, date, fn){
 db.view('rideshark', 'needTrip', {key:college}, function(e, b, h){
    if(e) console.log(e);
    var trips = b.rows;
    console.log(trips);
    for(var i in trips)
      trips[i] = trips[i].value;
    fn(true, trips);     
  });
};
exports.addEvent = b =  function(email, capacity, college, date, fn){
  var ev = {};
  ev.driver = email;
  ev.type = 'trip';
  ev.capacity = capacity;
  ev.from = college;
  ev.waitlist = [];
  ev.pool = [email];
  ev.date = date;
  ev.to = [];
  db.view('rideshark', 'getUser', {key: email}, function(e, b, h){
    if(e) console.log(e);
    var user = b.rows[0];
    if(!user){
      fn(false);
    }

    ev.to.push((user.value.address));
    db.insert(ev, function(e1, b1){
      if(e1) console.log(e1);
      user.value.trips.push(b1.rows[0].value._id)
      fn(true);
    });
  }); 
};
//b('csaba@gabor.com', 66, 'ha', '12:00', function(bool) {
//  console.log(bool);
//});
//exports.makeEvent();
