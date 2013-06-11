var nano = require('nano')('http://rideshark:rideshark123@abigopal.com:5984/');
var db = nano.db.use('rideshark');
module.exports = db;
