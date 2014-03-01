var include = require("include");
var app = include.app();
var Model = include.model("users-api");
var Secure = include.lib("secure");
var secure = new Secure();

exports = module.exports;

/**
 * Get one user
 */
exports.getUser = function(req, res) {
  var id = req.params.id;
	Model.findOne({_id: id}, function(err, result) {
		if(err) {
			res.send(406, err);
		}

		if(result) {
			res.send(200, result);
		}
	})
}

/**
 * Get all users
 */
exports.getUsers = function(req, res) {
  var query = Model.find({});

	// Limit
	if(req.query.limit && typeof req.query.limit !== undefined) {
		query = query.limit(req.query.limit);
	}
	else {
		query = query.limit(100);
	}

	// sort by timestamp
	query = query.sort({'_id': -1});

	query.exec(function(err, results) {
		if(err) {
			console.log(err);
			res.send(406, err)
		}

		if(results) {
			res.send(200, results);
		}
	});
}

/**
 * Create a user
 * valid object should have: username, fullname, password
 */
exports.postUser = function(req, res) {
  var body = req.body;	
  
	var user = new Model({ 
		created: Math.round(new Date().getTime() / 1000),
		username: body.username,
		fullName: body.fullName,
		lfullName: body.fullName.toLowerCase(),
		password: secure.encrypt(body.password)
	});

	user.save(function (err, result) {
		if(err) {
			res.send(406, err);
		}

		if(result) {
		  res.send(201, result);			
		}
	});
}

exports.getLogin = function(req, res) {
  res.render("login", {title: "Log in"});
}

exports.postLogin = function(req, res) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  });
}

exports.getLogout = function(req, res) {
  req.logout();
  res.redirect("/login");
}