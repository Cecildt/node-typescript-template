/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../typings/server.d.ts" />

import express = require('express');
import User = require('../models/user');

class AuthController {
  constructor(private app:express.Application) {
  }

}

export = AuthController;