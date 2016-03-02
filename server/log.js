/* @flow weak */

import winston from 'winston';
import winstonCassandra from 'winston-cassandra';

// Read environment
require( 'dotenv' ).load( );

import options from '../data/da_cassandra/_options.js';

// Transports for Winston
const transports = [ ];

// Use Cassandra for logging if Cassandra is configured
if( process.env.CASSANDRA_KEYSPACE != null && process.env.CASSANDRA_KEYSPACE.trim( ) != '' )
{
  // TODO this is broken until the following is fixed:
  // http://errorlog.xyz/nodejs-apache-cassandra-error/
  // https://groups.google.com/forum/#!topic/express-js/c1BbirgBsmM
  // https://github.com/datastax/nodejs-driver/search?q=schema_keyspaces <-- still used
  /*
  transports.push( new winstonCassandra( options ) );
  transports.push( new (winston.transports.Console)( ) );
  */
  // so instead just print:
  transports.push( new (winston.transports.Console)( ) );
}
else
  transports.push( new (winston.transports.Console)( ) );


var log = new (winston.Logger)( { transports: transports } );

export default log;
