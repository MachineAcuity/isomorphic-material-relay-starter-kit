/* @flow weak */

import winston from 'winston';
import winstonCassandra from 'winston-cassandra';

// Read environment
require( 'dotenv' ).load( );

import options from '../data/lib/CassandraOptions.js';

// Transports for Winston
const transports = [ ];

// Use Cassandra for logging if Cassandra is configured
if( process.env.OBJECT_PERSISTENCE == 'cassandra' )
{
  // Refuses to create schema - internally receives [ResponseError: unconfigured table schema_keyspaces] when tries to create schema
  transports.push( new winstonCassandra( options ) );
  transports.push( new (winston.transports.Console)( ) ); // Just copy to console for troubleshooting purposes
}
else
  transports.push( new (winston.transports.Console)( ) );


var log = new (winston.Logger)( { transports: transports } );

export default log;
