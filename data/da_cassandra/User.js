/* @flow weak */

import { runQueryNoResult, runQueryOneResult } from './_client.js';
import User from '../model/User'
import { Uuid } from '../../data/da_cassandra/_client.js';

const User_0 = new User( { id: Uuid.fromString( '00000000-0000-0000-0000-000000000000' ), username: '', password: '', User_DisplayName: 'Anonymous', "User_ProfilePhoto": '', User_Email: '', User_Locale: '', User_AuthToken: '' } );

export function DA_User_add( fields : any ) : User
{
  const new_User = new User( fields );
  new_User.id = Uuid.random( );

  const cqlText = 'INSERT INTO "User" (id, "username", "password", "User_DisplayName", "User_ProfilePhoto", "User_Email", "User_Locale", "User_AuthToken" ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';
  const cqlParams = [
    new_User.id,
    new_User.username,
    new_User.password,
    new_User.User_DisplayName,
    new_User.User_ProfilePhoto,
    new_User.User_Email,
    new_User.User_Locale,
    new_User.User_AuthToken,
  ];

  return runQueryNoResult( cqlText, cqlParams )
  .then( ( ) => {
    return new_User;
  } )
}
