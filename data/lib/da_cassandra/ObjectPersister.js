/* @flow weak */

import { runQuery, Uuid } from '../../da_cassandra/_client.js';

// For in operator syntax in CQL:
// http://stackoverflow.com/questions/23874137/cassandra-in-clause-on-index
// http://mechanics.flite.com/blog/2014/01/08/the-in-operator-in-cassandra-cql/

export function ObjectPersister_get( entityName, ObjectType, fieldName, values : Array<any> )
{
  let cqlText = 'SELECT * FROM "' + entityName + '" WHERE "' + fieldName + '" IN (';
  let cqlTextParams = [ ];
  let cqlParams = [ ];

  for( let value of values )
  {
    cqlTextParams.push( '?' );
    cqlParams.push( value );
  }

  cqlText += cqlTextParams.join( ',' ) + ');';

  console.log( 'ObjectPersister_get: ' + cqlText + ', param: ' + values.join( ) );

  return runQuery( ObjectType, cqlText, cqlParams );
}

export function ObjectPersister_getList( entityName, ObjectType, fieldName, values : Array<any> )
{
  let cqlText = 'SELECT * FROM "' + entityName + '" WHERE "' + fieldName + '" IN (';
  let cqlTextParams = [ ];
  let cqlParams = [ ];

  for( let value of values )
  {
    cqlTextParams.push( '?' );
    cqlParams.push( value );
  }

  cqlText += cqlTextParams.join( ',' ) + ') ALLOW FILTERING;';

  console.log( 'ObjectPersister_getList: ' + cqlText + ', param: ' + values.join( ) );

  runQuery( ObjectType, cqlText, cqlParams )
  .then( arrObjects => {
    // Prepare a bucket where all the lists will be stored
    let resultsByField = { };

    // Organize all the results by the field value
    for( let anObject of arrObjects )
    {
      // Get the field value - for UUID make sure it is converted to string
      let fieldValue = anObject[ fieldName ];
      if( fieldValue instanceof Uuid )
        fieldValue = fieldValue.toString( );

      // Ensure the bucket exists
      let bucketForID = resultsByField[ fieldValue ];
      if( bucketForID == null )
        bucketForID = resultsByField[ fieldValue ] = [ ];

      // Add to bucket
      bucketForID.push( anObject );
    }

    // Now create array with results which is in the same order as the values
    let arrResult: Array<any> = [ ];
    for( let fieldValue of values )
    {
      if( fieldValue instanceof Uuid )
        fieldValue = fieldValue.toString( );

      let bucketForID = resultsByField[ fieldValue ];
      if( bucketForID == null )
        bucketForID = [ ];

      let dataLoaderValue = { data: bucketForID };
      dataLoaderValue[ fieldName ] = fieldValue;

      arrResult.push( dataLoaderValue );
    }

    console.log( '=====-----===== 1 = ' + JSON.stringify( arrResult ) );

    return arrResult;
  } )
}

export function ObjectPersister_add( entityName, entity )
{
  throw new Error( "Not supported" );
}

export function ObjectPersister_update( entityName, entity )
{
  throw new Error( "Not supported" );
}

export function ObjectPersister_delete( entityName, entity )
{
  throw new Error( "Not supported" );
}
