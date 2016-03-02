/* @flow weak */

import chalk from 'chalk';
import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import log from './log.js';
import path from 'path';

import auth from './auth'; // Authentication server
import webapp from '../webapp/server'; // Isomorphic React server
import graphql from '../graphql/server'; // GraphQL server

// Read environment
require( 'dotenv' ).load( );

log.log( 'info', 'Message for Winston - test - starting app' );

console.log( chalk.blue( '----------------------------------------------------------------------------------------------------' ) );
console.log( 'Application ' + chalk.bold.magenta( process.env.npm_package_name ) + ' version ' + chalk.bold.magenta( process.env.npm_package_version ) + ' running in ' + chalk.bold.magenta( process.env.NODE_ENV ) );
console.log( 'Serving at ' + chalk.bold.magenta( process.env.HOST ) + ':' + chalk.bold.magenta( process.env.PORT ) + ', public url: ' + chalk.bold.magenta( process.env.PUBLIC_URL ) );
console.log( 'Cassandra keyspace ' + chalk.bold.magenta( process.env.CASSANDRA_KEYSPACE ) + ', connection points ' + ( process.env.CASSANDRA_CONNECTION_POINTS != null ? chalk.bold.magenta( process.env.CASSANDRA_CONNECTION_POINTS ) : 'undefined' ) );
console.log( chalk.blue( '----------------------------------------------------------------------------------------------------' ) );

let router = express( );

router.set( 'trust proxy', 'loopback' );
router.set( 'x-powered-by', false );

router.use( compression( ) );
router.use( cookieParser( ) );

// GraphQL server
router.use( '/graphql', graphql );

// Authentication server
router.use( '/auth', auth );

// Static assets server
let oneYear = 365*86400000;
router.use( express.static( path.resolve( __dirname + '/../public/' ), { maxAge: oneYear } ) );

// Application with routes
router.use( '/*', webapp );

let server = router.listen( process.env.PORT, process.env.HOST );

export default server;
