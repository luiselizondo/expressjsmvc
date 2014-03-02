var path = require("path")
	, Git = require("git-wrapper2")
	, git = new Git()
  , fs = require('fs');

/**
 * Check if the given directory `path` is empty.
 *
 * @param {String} path
 * @param {Function} fn
 */

function emptyDirectory(path, fn) {
  fs.readdir(path, function(err, files){
    if (err && 'ENOENT' != err.code) throw err;
    fn(!files || !files.length);
  });
}

/** 
 * clone a project 
 * @param name string the namd of the directory to clone into inside the modules directory
 * @param uri string the full URI of the repository
 */
function cloneProject(dir, uri) {
	emptyDirectory(dir, function(empty) {
		if(empty) {
			git.clone(uri, dir, function(err, repo) {
				
			});
		}
		else {
			console.log("Destination for %s not empty", dir);
		}
	});
}

/** 
 * Check if a module did install or not 
 */
function checkIfModuleInstalled(dir, callback) {
	emptyDirectory(dir, function(empty) {
		callback(empty);
	})
}

/** 
 * main exportable function 
 */
function installModules() {
	var expressjsmvc = fs.readFileSync("expressjsmvc.json", {encoding: "utf-8"});
	var file = JSON.parse(expressjsmvc);
	var modules = file.modules;
	
	// Define the base path
	var basepath = "modules/";

	// loop the modules property
	process.nextTick(function() {
		for(var name in modules) {
			var dir = path.join(basepath, name);
			cloneProject(dir, modules[name]);
		}
	});

	process.on("exit", function() {
		console.log("Finished downloading modules");
	})

	git.on("clone", function(repo, dir) {
		checkIfModuleInstalled(dir, function(empty) {
			// Retry if empty
			if(empty) {
				cloneProject(dir, repo);
			}
			else {
				console.log("Module %s downloaded in %s", repo, dir);
			}
		})
	})
}

module.exports = installModules;