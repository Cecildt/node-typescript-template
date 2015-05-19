/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../typings/server.d.ts" />

import express = require('express');

interface IUser {
  userId:string;
  firstName:string;
  lastName:string;
}

class User {
  _user:IUser;

  constructor(private request:express.Request) {
    
  }

  public setCurrentUser(userId:string, firstName:string, lastName:string) {
    
    _user.userId = userId;
    _user.firstName = firstName;
    _user.lastName = lastName;
  }
}

export = User;