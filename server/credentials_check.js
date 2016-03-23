/* @flow weak */

import jwt from 'jwt-simple';

import log from './log.js';


// Read environment
require( 'dotenv' ).load( );

export function getUserByCookie( objectManager, req, res )
{
  let authenticationFailed = false;
  let user_id = '00000000-0000-0000-0000-000000000000'; // Anonymous, unless cookie is passed

  try
  {
    if( req.cookies.auth_token )
      if( req.cookies.auth_token.length > 10 )
      {
        var decoded = jwt.decode( req.cookies.auth_token, process.env.JWT_SECRET );
        user_id = decoded.user_id;
      }
  }
  catch( err )
  {
    return Promise.reject( "Could not read auth cookie. " + err );
  }

  return objectManager.getOneById( 'User', user_id )
  .then( ( a_User ) => {
    if( a_User )
      return a_User;
    else
      return Promise.reject( "User not found" );
  } )
  ;
}

export function verifyUserAuthToken( a_User, req, res )
{
  if ( ! a_User )
    return Promise.reject( "User not found" );
  else
  {
    const request_User_AuthToken = req.get( 'user_auth_token' );
    if( request_User_AuthToken == a_User.User_AuthToken || request_User_AuthToken == 'Hello. My name is React Native and I want access to your wonderful GraphQL server. kthx.' )
      return Promise.resolve( a_User.id );
    else
    {
      return Promise.reject( "Authentication token expected: " + a_User.User_AuthToken + ", provided:" + request_User_AuthToken );
    }
  }
}

export function serveAuthenticationFailed( res, message )
{
  log.log( 'warn', 'Checking credentials failed: ' + message );

  res.cookie( 'auth_token', '', { httpOnly: true, expires: new Date( 1 ) } ); // Expire cookie. Only way to 'delete'
  res.status( 403 ).send( 'Authentication failed' );
}
