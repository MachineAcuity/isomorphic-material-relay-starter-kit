/* @flow weak */

import { runQuery, runQueryOneResult, runQueryNoResult, Uuid } from '../../da_cassandra/_client.js';

// For in operator syntax in CQL:
// http://stackoverflow.com/questions/23874137/cassandra-in-clause-on-index
// http://mechanics.flite.com/blog/2014/01/08/the-in-operator-in-cassandra-cql/
// The approach using IN has limitations, might get changed to batching of queries.

export function ObjectPersister_get( entityName: string, ObjectType: any, fieldName: string, values : Array<any> )
{
  let cqlText = 'SELECT * FROM "' + entityName + '" WHERE "' + fieldName + '" = ?;';
  let resultPromises = [ ];

  for( let value of values )
    resultPromises.push( runQueryOneResult( ObjectType, cqlText, [ value ] ) );

  return Promise.all( resultPromises );
}

export function ObjectPersister_getList( entityName: string, ObjectType: any, fieldName: string, values : Array<any> )
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

  return runQuery( ObjectType, cqlText, cqlParams )
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

      arrResult.push( bucketForID );
    }

    return arrResult;
  } )
}

export function ObjectPersister_add( entityName: string, fields: any )
{
  const id = Uuid.random( );

  let cqlTextFieldNames = 'id';
  let cqlTextFieldValues = '?';
  let cqlParams = [
    id,
  ];

  for( let fieldName in fields )
  {
    cqlTextFieldNames += ', "' + fieldName + '"';
    cqlTextFieldValues += ', ?';
    cqlParams.push( fields[ fieldName ] );
  }

  let cqlText = 'INSERT INTO "' + entityName + '" (' + cqlTextFieldNames + ') VALUES (' + cqlTextFieldValues + ');';

  return runQueryNoResult( cqlText, cqlParams )
  .then( ( ) => {
    return id;
  } )
  ;
}

export function ObjectPersister_update( entityName: string, fields: any )
{
  let cqlText = 'UPDATE "' + entityName + '" SET ';
  let cqlParams = [ ];

  let followingItem = false;

  for( let fieldName in fields )
    if( fieldName != 'id' ) // Do not update id
    {
      if( followingItem )
        cqlText += ', ';
      else
        followingItem = true;

      cqlText += '"' + fieldName + '" = ?';
      cqlParams.push( fields[ fieldName ] );
    }

  cqlText += ' WHERE id = ?;';
  cqlParams.push( id );

  return runQueryNoResult( cqlText, cqlParams );
}

export function ObjectPersister_delete( entityName: string, id : Uuid )
{
  const cqlText = 'DELETE FROM "' + entityName + '" WHERE id = ?;';
  const cqlParams = [ id ];

  return runQueryNoResult( cqlText, cqlParams );
}
