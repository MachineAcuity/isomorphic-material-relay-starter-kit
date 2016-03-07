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
  let cqlText = 'SELECT * FROM "' + entityName + '" WHERE "' + fieldName + '" = ?;';
  let resultPromises = [ ];

  for( let value of values )
    resultPromises.push( runQuery( ObjectType, cqlText, [ value ] ) );

  return Promise.all( resultPromises );
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
  cqlParams.push( fields.id );

  return runQueryNoResult( cqlText, cqlParams );
}

export function ObjectPersister_delete( entityName: string, fields: any )
{
  const cqlText = 'DELETE FROM "' + entityName + '" WHERE id = ?;';
  const cqlParams = [ fields.id ];

  return runQueryNoResult( cqlText, cqlParams );
}
