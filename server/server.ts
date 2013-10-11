/// <reference path="../typings/express.d.ts" />
/// <reference path="../typings/node.d.ts" />

import http = require("http");
import url = require("url");
import routes = require("./routes/index");
import express = require("express");

var app = module.exports = express();

// Configuration
app.configure(function () {
    app.set('port', process.env.PORT || 1337);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    
    
    if (process.env.SESSIONNAME === 'Console') {
        // this is to make sure express does not serve static files when in IIS
        app.use(express.static(__dirname + '/public'));
    }
    console.log(__dirname + '/public');
    app.use(app.router);
});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);

app.listen(app.get('port'), function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
