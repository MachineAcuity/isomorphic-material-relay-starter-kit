/* @flow weak */

import chalk from 'chalk';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import jwt from 'jwt-simple';

import { DA_User_get } from '../data/da/User';
import schema from './schema'; // Schema for GraphQL server

// Read environment
require( 'dotenv' ).load( );

let router = express( );

router.use( '/', ( req, res, next ) =>
{
  let user_id = '00000000-0000-0000-0000-000000000000'; // Anonymous
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
    console.log( chalk.bold.red( "Failure while decoding JWT token, using anonymous instead." ) );
    console.log( chalk.red( err.message ) );
    console.log( chalk.blue( '.' ) );
  }

  const user_auth_token = req.get( 'user_auth_token' );

  DA_User_get( user_id )
  .then( ( a_User) =>
  {
    let authenticationFailed = false;
    if ( ! a_User )
      authenticationFailed = true;
    else
      if( user_auth_token != process.env.USER_AUTH_SECRET )
        if( user_auth_token != a_User.User_AuthToken )
          authenticationFailed = true;

    if( authenticationFailed )
    {
      // User not found in database
      user_id = '00000000-0000-0000-0000-000000000000'; // Anonymous
      res.cookie( 'auth_token', '', { httpOnly: true, expires: new Date( 1 ) } ); // Expire cookie
    }

    graphQLHTTP( request => {
      return( {
        schema: schema,
        rootValue: { user_id: user_id },
        pretty: true,
        graphiql: true,
      } )
    } )( req, res, next );

  } )
  ;

} );

export default router;
