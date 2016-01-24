import chalk from 'chalk';
import squel from 'squel';
import cassandraDriver from 'cassandra-driver';

// Read environment
require( 'dotenv' ).load( );


squel.registerValueHandler( cassandraDriver.types.Uuid, function( uuid ){ return uuid; } );

export const sql = squel;
export const Uuid = cassandraDriver.types.Uuid;

let options =
{
  contactPoints: process.env.CASSANDRA_CONNECTION_POINTS.split(','),
  keyspace: process.env.CASSANDRA_KEYSPACE
};

if (process.env.CASSANDRA_USER) 
{
  options.authProvider =
    new cassandraDriver.auth.PlainTextAuthProvider(
      process.env.CASSANDRA_USER,
      process.env.CASSANDRA_PASSWORD
    );
}

export const client = new cassandraDriver.Client(options);

function ensureNoErrorOrReport( qText, qVar, err, reject )
{
  if( err )
  {
    console.log( chalk.bold.red( err ) );
    console.log( chalk.gray( "Query: " ) + chalk.red( qText ) );
    console.log( chalk.gray( "Parameters: " ) + chalk.red( JSON.stringify( qVar ) ) );
    console.log( chalk.blue( "." ) );
  }
  else
    return true;
}

export function runQuery( objectPrototype, qText, qVar )
{
  //console.log( "runQuery [" + qText + "] params=" + JSON.stringify( qVar ) );
  return new Promise( ( resolve, reject ) =>
  {
    client.execute( qText, qVar, {prepare: true}, ( err, result ) => { if( ensureNoErrorOrReport( qText, qVar, err, reject ) )
    {
      const resultAsObjects = [ ];
      const rowCount = result.rowLength;
      for( let ixRow = 0 ; ixRow < rowCount ; ixRow++ )
      {
        let row = result.rows[ ixRow ];
        resultAsObjects.push( new objectPrototype( row ) );
      }
      //console.log( "runQuery: " + JSON.stringify( resultAsObjects ) );
      resolve( resultAsObjects );
    } } );
  } );
}

export function runQueryOneResult( objectPrototype, qText, qVar )
{
  //console.log( "runQueryOneResult [" + qText + "] params=" + JSON.stringify( qVar ) );
  return new Promise( ( resolve, reject ) =>
  {
    client.execute( qText, qVar, {prepare: true}, ( err, result ) => { if( ensureNoErrorOrReport( qText, qVar, err, reject ) )
    {
      //console.log( "runQueryOneResult [" + qText + "] params=" + JSON.stringify( qVar ) + " err=" + JSON.stringify( err ) + " result=" + JSON.stringify( result ) );
      if( result.rowLength > 0 )
      {
        let row = result.rows[ 0 ];
        const retObj = new objectPrototype( row );
        resolve( retObj );
      }
      else
        resolve( null );
    } } );
  } );
}

export function runQueryNoResult( qText, qVar )
{
  //console.log( "runQueryNoResult [" + qText + "] params=" + JSON.stringify( qVar ) );
  return new Promise( ( resolve, reject ) =>
  {
    client.execute( qText, qVar, {prepare: true}, ( err ) => { if( ensureNoErrorOrReport( qText, qVar, err, reject ) )
    {
      //console.log( "runQueryNoResult [" + qText + "] params=" + JSON.stringify( qVar ) + " err=" + JSON.stringify( err ) );
      resolve( );
    } } );
  } );
}
