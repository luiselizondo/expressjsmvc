var app = require("../../app");
var controller = require("./controllers");
var Model = require("./models");

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
      if (!user.validPassword(password)) {
        return next(null, false, {
          message: 'Incorrect password.' 
        });
      }
      return next(null, user);
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