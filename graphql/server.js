/* @flow weak */

import express from 'express';
import graphQLHTTP from 'express-graphql';
import ObjectManager from '../data/ObjectManager';

import { getUserByCookie, verifyUserAuthToken, serveAuthenticationFailed } from '../server/credentials_check.js';
import schema from './schema'; // Schema for GraphQL server

let router = express( );

router.use( '/', ( req, res, next ) =>
{
  // create individual object manager for each request
  const objectManager = new ObjectManager( );

  getUserByCookie( objectManager, req, res )
  .then( ( a_User ) => verifyUserAuthToken( a_User, req, res ) )
  .then( ( user_id ) => {
    graphQLHTTP( request => {
      return( {
        schema: schema,
        rootValue: { user_id, objectManager },
        pretty: true,
        graphiql: true,
      } )
    } )( req, res, next );
  } )
  .catch( ( error ) => serveAuthenticationFailed( res, error ) )
  ; // then
} ); // router.use

export default router;
