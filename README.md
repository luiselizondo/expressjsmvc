Express MVC is an Express.js framework organized in an MVC way with extra helpers and utilities.

The goal of ExpressMVC is to simplify common tasks and make your application more modular, but at the same time, not creating another framework or a different community. 

### Install

	npm install -g expressjsmvc

### Create your application

	expressjsmvc install application-name

### Install required packages

	cd application-name && npm install

### Download the modules defined in expressjsmvc.json
	
	expressjsmvc install-modules

### Start your application
	
	node start.js

### Features
ExpressMVC offers some features out of the box that you might find interesting:

#### Modular structure
ExpressMVC lets you organize your application in modules that you can reuse. This modules are organized in controllers, models and views and file to define your routes.

Structure of a module

	/modules/blog
		/controllers
			index.js <- This file contains your controller
		/models
			index.js <- This file contains the models for your module
		/views
			blogPage.jade <- This file is a blog page
		index.js <- Define your routes here

#### Views separation
With ExpressMVC you can separate your views and package them into your modules. You can access your /views directory without having to use relative paths, example:

	include /layout

#### Easy require for both modules, libraries and 
You can require any module from other modules as long as you organize your modules in the propossed structure. See an example in the frontpage module.

#### Event driven 
ExpressMVC lets you bind events to the application and trigger them from anywhere really easy.

Example

	var include = require("includemvc");
	var app = include.app();

	app.on("myevent", function(data) {
		console.log(data);
	})

	app.emit("myevent", {title: "Hello World"});

#### Bower ready
The framework comes out of the box with a bower file so you can run bower install and automatically include jQuery, Bootstrap, Backbone.js and Underscore.js

#### Module package manager
ExpressMVC provides you with an easy way to define the needed modules by your application. Define the modules you need to download in expressjsmvc.json. We use git to download the modules so you need to have it installed first. All defined modules will be downloaded into the modules directory.

#### Enable or disable modules easily
Forget about requiring your modules in your application, all you need to do is add them to the config.modules array and they will be enabled.

### ToDo
- download modules dependencies

### License
The MIT License (MIT)

Copyright (c) [2014] [Luis Elizondo]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.