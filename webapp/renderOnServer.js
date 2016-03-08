/* @flow weak */

import chalk from 'chalk';
import IsomorphicRouter from 'isomorphic-relay-router';
import Helmet from 'react-helmet';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Relay from 'react-relay';
//import RelayStoreData from 'react-relay/lib/RelayStoreData';
import {match} from 'react-router';
import seqqueue from 'seq-queue';

import routes from './routes';
import {isomorphicVars} from './scripts/isomorphicVars';

// Read environment
require( 'dotenv' ).load( );

// Load up isomorphic vars here, for server rendering
const isoVars = JSON.stringify( isomorphicVars( ) );

// Create a queue for isomorphic loading of pasges, because the GrapQL network layer
// is a static
const queue = seqqueue.createQueue( 2000 );

// Render on server will assume always that it can use localhost to access the GraphQL server. It is
// not considered necessary to use the public URL.
const GRAPHQL_URL = ( isoVars.public_url == null ) ? `http://localhost:${process.env.PORT}/graphql` : isoVars.public_url + '/graphql';


export default ( req, res, next, assetsPath ) =>
{
  const headers = { };
  if( req.cookies.auth_token )
    headers.Cookie = 'auth_token=' + req.cookies.auth_token;
  headers.user_auth_token = process.env.USER_AUTH_SECRET;

  match( { routes, location: req.originalUrl }, ( error, redirectLocation, renderProps ) =>
    {
      queue.push(
        queueTask =>
        {
          // Setting the STATIC network layer. No fear about it being static - we are in a queue!
          Relay.injectNetworkLayer( new Relay.DefaultNetworkLayer( GRAPHQL_URL, { headers: headers } ) );
          //RelayStoreData.getDefaultInstance( ).getChangeEmitter( ).injectBatchingStrategy(() => { } );

          if( error )
            next(error);
          else if( redirectLocation )
            res.redirect( 302, redirectLocation.pathname + redirectLocation.search );
          else if( renderProps )
            IsomorphicRouter.prepareData( renderProps ).then( render, next );
          else
              res.status( 404 ).send( 'Not Found' );

          function render( { data, props } )
          {
            try
            {
              // Setting up static, global navigator object to pass user agent to material-ui. Again, not to
              // fear, we are in a queue.
              GLOBAL.navigator = { userAgent: req.headers[ 'user-agent' ] };

              // Setting up static, global location for the leftNav
              GLOBAL.location = { pathname: req.originalUrl };

              const reactOutput = ReactDOMServer.renderToString(
                  <IsomorphicRouter.RouterContext {...props} />
              );
              const helmet = Helmet.rewind( );

              res.render( path.resolve( __dirname, '..', 'webapp/views', 'index.ejs' ), {
                  preloadedData: JSON.stringify(data),
                  assetsPath: assetsPath,
                  reactOutput,
                  title: helmet.title,
                  meta: helmet.meta,
                  link: helmet.link,
                  isomorphicVars: isoVars,
                  NODE_ENV: process.env.NODE_ENV,
              } );
            }
            catch( err )
            {
              console.log( chalk.gray( "renderOnServer exception: " ) + chalk.red.bold( err.message ) );
              console.log( chalk.red( err.stack ) );
              console.log( chalk.blue( '.' ) );
            }

            queueTask.done( );
          }
        },
        ( ) => console.log( "Timeout for renderer" ),
        2000
      ); // 2 second time out for rendering an isomorphic page
    }
  );
};
