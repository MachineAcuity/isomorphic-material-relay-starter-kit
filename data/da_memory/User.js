/* @flow weak */

import { Uuid } from '../da_cassandra/_client.js';


import User from '../model/User'

// Mock data

var User_listById = { };
User_listById[ DA_User_GetUUIDByID( 0 ) ] = new User( { id: Uuid.fromString( DA_User_GetUUIDByID( 0 ) ), username: '', password: '', User_DisplayName: 'Anonymous', User_ProfilePhoto: '', User_Email: '', User_Locale: '', User_AuthToken: '' } );


// Data access functions

export function DA_User_add( fields : any ) : Promise
{
  return DA_User_getByUserName( fields.username )
  .then( ( a_User ) =>
  {
    if ( ! a_User )
    {
      var new_User = new User( fields );

      new_User.id = Uuid.random( );

      User_listById[ new_User.id.toString( ) ] = new_User;

      return new_User;
    }
    else throw new Error( "User name already in use" );
  } )
  ;
}

export function DA_User_getByUserName( username : string ) : Promise
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    for( let user_id in User_listById )
    {
      let a_User = User_listById[ user_id ];
      if( a_User.username === username )
        resolve( a_User );
    }

    resolve( null );
  }, 100 ) );
}

export function DA_User_update( User_id : Uuid, id : Uuid, fields : any )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    var a_User = User_listById[ id ];

    a_User.User_DisplayName   = fields.User_DisplayName;
    a_User.User_ProfilePhoto  = fields.User_ProfilePhoto;
    a_User.User_Email         = fields.User_Email;
    a_User.User_Locale        = fields.User_Locale;

    resolve( );
  }, 100 ) );
}

export function DA_User_updatePassword( User_id : Uuid, id : Uuid, User_Password : string )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    var a_User = User_listById[ id ];

    a_User.password = User_Password;

    resolve( );
  }, 100 ) );
}
