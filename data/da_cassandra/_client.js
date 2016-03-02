/* @flow weak */

import chalk from 'chalk';
import cassandraDriver from 'cassandra-driver';

import options from './_options.js';


export const Uuid = cassandraDriver.types.Uuid;
export const client = new cassandraDriver.Client( options );


function ensureNoErrorOrReport( qText : string, qVar : Array<any>, err : any, reject : any )
{
  if( err )
  {
    console.log( chalk.bold.red( err ) );
    console.log( chalk.gray( "Query: " ) + chalk.red( qText ) );
    console.log( chalk.gray( "Parameters: " ) + chalk.red( JSON.stringify( qVar ) ) );
    console.log( chalk.blue( "." ) );

    reject( err ); // Because terrisgit said so
  }
  else
    return true;
}

export function runQuery( objectPrototype : any, qText : string, qVar : Array<mixed> ) : Promise
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

export function runQueryOneResult( objectPrototype : any, qText : string, qVar : Array<mixed> ) : Promise
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

export function runQueryNoResult( qText : string, qVar : Array<any> ) : Promise
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
