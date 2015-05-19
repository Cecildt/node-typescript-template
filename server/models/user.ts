/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../typings/server.d.ts" />

import express = require('express');

interface IUser {
  userId:string;
  firstName:string;
  lastName:string;
}

class User {
  _user : IUser;

  constructor(private request : express.Request) {
    console.log('User created.');
  }

  public setCurrentUser(userId : string, firstName : string, lastName : string) {
    this._user = {
      userId: userId,
      firstName: firstName,
      lastName: lastName
    };
  }
}

export = User;