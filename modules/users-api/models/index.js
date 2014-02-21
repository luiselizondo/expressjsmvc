var mongoose = require('mongoose');

var User = mongoose.model('User', {
	username: String,
	password: String,
	fullName: String,
	lfullName: String,
	created: Number,
});

module.exports = User;