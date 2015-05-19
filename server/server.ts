/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/server.d.ts" />

import fs = require('fs');
import https = require('https');
import http = require('http');

import express = require('express');
var logger = require('connect-logger');
var cookieParser = require('cookie-parser');
import session = require('express-session');
var FileStore = require('session-file-store')(session);
var swig = require('swig');

var controllerFactory = require('./controllers/index');

// setup express
var app = express();
app.use(logger());
app.use(cookieParser('8d705e4b-c142-420e-955a-a1a58263b6bd')); // Change key on new project
app.use(session({
  store: new FileStore(),
  secret: '13603e53-f0af-41dd-b020-dbf5c9e7768e', // Change key on new project
  resave: false,
  saveUninitialized: true
}));

// configure express to use swig as the view engine
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
// change express default where to look for views on the server
app.set('views', __dirname + '/views');

// setup express to have static resource folders
app.use('/public', express.static(__dirname + '/public'));

// load UX and API controllers
var controllers = new controllerFactory(app);
controllers.init();

// setup ssl self hosting
var httpServerPort = process.env.PORT || 1337;  // use server value (for Azure) or local port

// create & startup HTTP webserver
http.createServer(app)
    .listen(httpServerPort);

console.log('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+');
console.log('Web Server listening at http://[local-ip]:%s', httpServerPort);
console.log('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+');
