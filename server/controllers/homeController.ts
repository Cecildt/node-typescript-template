/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../typings/server.d.ts" />

import express = require('express');
import User = require('../models/user');

class HomeController {
  constructor(private app:express.Application) {
    this.loadRoutes();
  }

  /**
   * Setup routing for controller.
   */
  public loadRoutes() {
    // setup home route for application
    this.app.get('/', this.rootGet);
    this.app.get('/about', this.aboutGet);
  }

  /**
   * @description
   *  Handler for the request for the default home route.
   *
   * @param request {express.Request} HTTP request object.
   * @param response {express.Response} HTTP response object.
   */
  public rootGet(request:express.Request, response:express.Response) {
    // get current user details
    var user = new User(request);
    user.setCurrentUser('1', 'John', 'Doe');

    // render the view
    response.render('index', user);
  }

  /**
   * @description
   *  Handler for the request for the about route.
   *
   * @param request {express.Request} HTTP request object.
   * @param response {express.Response} HTTP response object.
   */
  public aboutGet(request:express.Request, response:express.Response) {

    // render the view
    response.render('about');
  }
}

export = HomeController;