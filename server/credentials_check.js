/* @flow weak */

import chalk from 'chalk';
import jwt from 'jwt-simple';


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

  return objectManager.getOneById( 'User', user_id );
}

export function verifyUserAuthToken( a_User, req, res )
{
  if ( ! a_User )
    return Promise.reject( "User not found" );
  else
  {
    const request_User_AuthToken = req.get( 'user_auth_token' );
    if( request_User_AuthToken == a_User.User_AuthToken )
      return Promise.resolve( a_User.id );
    else
    {
      return Promise.reject( "Authentication token expected: " + a_User.User_AuthToken + ", provided:" + request_User_AuthToken );
    }
  }
}

export function serveAuthenticationFailed( res, message )
{
  // TODO implement winston logging here
  console.log( chalk.bold.red( message ) );
  console.log( chalk.blue( '.' ) );

  res.cookie( 'auth_token', '', { httpOnly: true, expires: new Date( 1 ) } ); // Expire cookie
  res.status( 403 ).send( 'Authentication failed' );
}
