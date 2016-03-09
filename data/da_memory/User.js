/* @flow weak */

import { Uuid } from '../da_cassandra/_client.js';


import User from '../model/User'

// Mock data

var User_listById = { };


// Data access functions

export function DA_User_add( fields : any ) : Promise
{
  var new_User = new User( fields );

  new_User.id = Uuid.random( );

  User_listById[ new_User.id.toString( ) ] = new_User;

  return new_User;
}
