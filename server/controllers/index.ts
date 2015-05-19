/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../typings/server.d.ts" />

import express = require('express');
import HomeController = require('./homeController');
import AuthController = require('./authController');

class Controllers {
  constructor(private app:express.Application) {
  }

  public init() {
    var home = new HomeController(this.app);
    var auth = new AuthController(this.app);
  }
}

export = Controllers;