/* @flow weak */

import { runQueryNoResult, runQueryOneResult } from './_client.js';
import User from '../model/User'
import { Uuid } from '../../data/da_cassandra/_client.js';

const User_0 = new User( { id: Uuid.fromString( '00000000-0000-0000-0000-000000000000' ), username: '', password: '', User_DisplayName: 'Anonymous', "User_ProfilePhoto": '', User_Email: '', User_Locale: '', User_AuthToken: '' } );

export function DA_User_add( fields : any ) : User
{
  return DA_User_getByUserName( fields.username )
  .then( ( a_User ) =>
  {
    if ( ! a_User )
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
    else throw new Error( "User name already in use" );
  } )
  ;
}

export function DA_User_getByUserName( username : string ) : Promise
{
  const cqlText = 'SELECT * FROM "User" WHERE "username" = ?;';
  const cqlParams = [
    username
  ];

  return runQueryOneResult( User, cqlText, cqlParams );
}

export function DA_User_get( User_id : Uuid ) : Promise
{
  // Anonymous user is not even recorded in the database
  if( User_id === '00000000-0000-0000-0000-000000000000' )
  {
    return new Promise( ( resolve, reject ) =>
      resolve( User_0 )
    );
  }
  else
  {
    const cqlText = 'SELECT * FROM "User" WHERE id = ?;';
    const cqlParams = [
      User_id
    ];
    return runQueryOneResult( User, cqlText, cqlParams );
  }
}

export function DA_User_update( User_id : Uuid, id : Uuid, fields : any ) : Promise
{
  // We will not update User_User_id since it makes no sense to update it
  let cqlText = 'UPDATE "User" SET "User_DisplayName" = ?, "User_ProfilePhoto" = ?, "User_Email" = ?, "User_Locale" = ? WHERE id = ?;';
  let cqlParams = [
    fields.User_DisplayName,
    fields.User_ProfilePhoto,
    fields.User_Email,
    fields.User_Locale,
    id,
  ];
  return runQueryNoResult( cqlText, cqlParams );
}

export function DA_User_updatePassword( User_id : Uuid, id : Uuid, User_Password : string ) : Promise
{
  // We will not update User_User_id since it makes no sense to update it
  let cqlText = 'UPDATE "User" SET "password" = ? WHERE id = ?;';
  let cqlParams = [
    User_Password,
    id,
  ];
  return runQueryNoResult( cqlText, cqlParams );
}
