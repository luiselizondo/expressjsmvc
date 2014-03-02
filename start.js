var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var include = require("includemvc");
var app = include.app();
var config = app.config;

var server = http.createServer(app);
var io = include.lib("socket")(server);
var fs = require("fs");
mongoose.connect(config.mongodburi);

/** 
 * Load all modules enabled in config.modules
 * The module must have an index.js present 
 */
var modules = config.modules;
modules.forEach(function(module) {
	app.use(require("./modules/" + module));
});

server.listen(app.get('port'), function(){
  console.log('ExpressMVC server listening on port ' + app.get('port'));
});