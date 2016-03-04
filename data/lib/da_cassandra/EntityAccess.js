/* @flow weak */

import { runQuery } from '../../da_cassandra/_client.js';

// For in operator syntax in CQL:
// http://stackoverflow.com/questions/23874137/cassandra-in-clause-on-index
// http://mechanics.flite.com/blog/2014/01/08/the-in-operator-in-cassandra-cql/

export function EntityAccess_get( entityName, ObjectType, fieldName, values )
{
  let cqlText = 'SELECT * FROM "' + entityName + '" WHERE "' + fieldName + '" IN (';
  let cqlTextParams = [ ];
  let cqlParams = [ ];

  for( let value of values )
  {
    cqlTextParams.push( '?' );
    cqlParams.push( value );
  }

  cqlText += cqlTextParams.join( ',' ) + ')';

  console.log( 'EntityAccess_get: ' + cqlText );

  return runQuery( ObjectType, cqlText, cqlParams );
}

export function EntityAccess_add( entityName, entity )
{
  throw new Error( "Not supported" );
}

export function EntityAccess_update( entityName, entity )
{
  throw new Error( "Not supported" );
}

export function EntityAccess_delete( entityName, entity )
{
  throw new Error( "Not supported" );
}
