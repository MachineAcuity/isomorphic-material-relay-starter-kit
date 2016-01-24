import { Uuid } from '../da_cassandra/_client.js';


import User from '../model/User'

// Helper function to make sure we get our proper FK ID values
// The are constant so that we can use our cookies between server restarts
function DA_User_GetUUIDByID( id )
{
  if( id === 0 ) return '00000000-0000-0000-0000-000000000000'; // Anonymous user uses UUID also
  if( id === 1 ) return 'd362e1df-1fa8-466b-b311-af90b2a71e8e';
  if( id === 2 ) return '33171548-39d3-45d8-ab5c-5eedefe01dfc';
}

// Mock data

var usersById = { };
usersById[ DA_User_GetUUIDByID( 0 ) ] = new User( { id: Uuid.fromString( DA_User_GetUUIDByID( 0 ) ), username: '', password: '', displayName: 'Anonymous', email: '' } );
usersById[ DA_User_GetUUIDByID( 1 ) ] = new User( { id: Uuid.fromString( DA_User_GetUUIDByID( 1 ) ), username: 'jack', password: 'secret', displayName: 'Jack Myuser', email: 'jack@example.com' } );
usersById[ DA_User_GetUUIDByID( 2 ) ] = new User( { id: Uuid.fromString( DA_User_GetUUIDByID( 2 ) ), username: 'jill', password: 'birthday', displayName: 'Jill Daccount', email: 'jill@example.com' } );


// Data access functions

export function DA_User_getByUserName( username )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    for( let user_id in usersById )
    {
      let a_User = usersById[ user_id ];
      if( a_User.username === username )
        resolve( a_User );
    }

    resolve( null );
  }, 100 ) );
}

export function DA_User_get( id )
{
  return new Promise( ( resolve, reject ) =>
    setTimeout( ( ) => resolve( usersById[ id.toString( ) ] ), 100 )
  );
}
