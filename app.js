/**
 * @file exposes the app object instantiated so other modules can
 * require it and share events across the entire application
 */

var express = require("express");
var config = require("./config/config.json");
var app = module.exports = exports = express();
var path = require("path");
var multiViews = require('./lib/viewMultiple')(app);
var addView = require("./lib/addView");

// Alloy all configuration to be available in app.config
app.config = config;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', [path.join(__dirname, 'views')]);
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

/** 
 * Autodetect all views in modules 
 */
var modules = config.modules;
modules.forEach(function(module) {
	addView(app, path.join(__dirname, "modules/" + module));
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}