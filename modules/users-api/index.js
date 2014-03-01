var include = require("include");
var app = include.app();
var controller = include.controller("users-api");
var Model = include.model("users-api");
var Secure = include.lib("secure");
var secure = new Secure();

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, next) {
    console.log("Finding a user with username: " + username);
    Model.findOne({ username: username }, function(err, user) {
      if (err) { 
        return next(err); 
      }
      if (!user) {
        return next(null, false, { 
          message: 'Incorrect username.' 
        });
      }
      if (secure.encrypt(password) != user.password) {
        return next(null, false, {
          message: 'Incorrect password.' 
        });
      }
      if (secure.encrypt(password) == user.password) {
        return next(null, user);
      }
    });
  }
));

app.get("/api/users/:id", controller.getUser);
app.get("/api/users", controller.getUsers);
app.post("/api/users", controller.postUser);

app.get("/login", controller.getLogin);
app.post('/login',
  passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true })
);

app.get("/logout", controller.getLogout);