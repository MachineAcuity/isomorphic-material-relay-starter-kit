/* @flow weak */

import { Uuid } from '../da_cassandra/_client.js';


import User from '../model/User'

// Helper function to make sure we get our proper FK ID values
// The are constant so that we can use our cookies between server restarts
function DA_User_GetUUIDByID( id : number ) : string
{
  if( id === 0 ) return '00000000-0000-0000-0000-000000000000'; // Anonymous user uses UUID also
  else if( id === 1 ) return 'd362e1df-1fa8-466b-b311-af90b2a71e8e';
  else if( id === 2 ) return '33171548-39d3-45d8-ab5c-5eedefe01dfc';
  else throw new Error( 'Bad ID' );
}

// Mock data

var User_listById = { };
User_listById[ DA_User_GetUUIDByID( 0 ) ] = new User( { id: Uuid.fromString( DA_User_GetUUIDByID( 0 ) ), username: '', password: '', User_DisplayName: 'Anonymous', User_ProfilePhoto: '', User_Email: '', User_Locale: '', User_AuthToken: '' } );
User_listById[ DA_User_GetUUIDByID( 1 ) ] = new User( { id: Uuid.fromString( DA_User_GetUUIDByID( 1 ) ), username: 'jack', password: '$2a$08$nRpts0s9gv3DwvpBY1ptRe6M1ushtVHHrU6W53zmp4g4OqngAi78y', User_DisplayName: 'Jack Van Der Cub', User_ProfilePhoto: '/profile_photos/jack.jpg', User_Email: 'jack@example.com', User_Locale: '', User_AuthToken: 'abc' } ); // Password: secret
User_listById[ DA_User_GetUUIDByID( 2 ) ] = new User( { id: Uuid.fromString( DA_User_GetUUIDByID( 2 ) ), username: 'jill', password: '$2a$08$RLCA/lRJNQCcPNmCadXu2OVZeB8x4S0pMhkOLnV0uppbDYcGa5gMu', User_DisplayName: 'Jill McBear', User_ProfilePhoto: '/profile_photos/jill.jpg', User_Email: 'jill@example.com', User_Locale: '', User_AuthToken: 'def' } ); // Password: birthday


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

export function DA_User_get( User_id : Uuid ) : Promise
{
  return new Promise( ( resolve, reject ) =>
    setTimeout( ( ) => resolve( User_listById[ User_id.toString( ) ] ), 100 )
  );
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
