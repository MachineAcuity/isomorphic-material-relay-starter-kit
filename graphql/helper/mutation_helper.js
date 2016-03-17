/* @flow weak */

import chalk from 'chalk';
import { cursorForObjectInConnection } from "graphql-relay";
import { Uuid } from '../../data/lib/CassandraClient.js';



export function cursorForObjectInConnectionWithUuidComparison( arr, obj )
{
  // IDs can be both strings and Uuid. Check that first, and convert to String
  let obj_id = obj.id;
  if( obj_id instanceof Uuid ) obj_id = obj_id.toString( );

  // Make sure that the object and its instance can be compared with ===
  // assumed that the object has id field which is unique
  for( let ix = 0; ix < arr.length; ix++ )
  {
    let arr_element_id = arr[ ix ].id;
    if( arr_element_id instanceof Uuid ) arr_element_id = arr_element_id.toString( );

    if( arr_element_id == obj_id )
    {
      arr[ ix ] = obj;
      break;
    }
  }

  let cursor = cursorForObjectInConnection( arr, obj );
  if( cursor == null )
  {
    console.log( chalk.bold.red( "Could not create cursor for object in connection" ) );
    console.log( chalk.gray( "Object: " ) + chalk.red( JSON.stringify( obj ) ) );
    console.log( chalk.gray( "Array: " ) + chalk.red( JSON.stringify( arr ) ) );
    console.log( chalk.blue( "." ) );
  }

  return cursor;
}
