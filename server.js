var user = require('./user');

var michael = new user.User('Michael');
var nataly = new user.User('Nataly');

michael.hello(nataly);