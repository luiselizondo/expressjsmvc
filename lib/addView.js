var path = require("path");

/** 
 * Views is an array of views locations
 * Add the new path to the array 
 */
module.exports = function(app, directory) {
	var views = app.settings.views;
	var currentView = path.join(directory, 'views');
	views.push(currentView);
	app.set('views', views);
}