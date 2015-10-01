import express = require('express');
import User = require('../models/user');

class AuthController {
  constructor(private app:express.Application) {
  }

}

export = AuthController;