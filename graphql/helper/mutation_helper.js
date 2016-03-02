/* @flow weak */

import chalk from 'chalk';
import { cursorForObjectInConnection } from "graphql-relay";


export function cursorForObjectInConnectionWithUuidComparison( arr, obj )
{
  // Make sure that the object and its instance can be compared with ===
  // assumed that the object has id field which is unique
  for( let ix = 0; ix < arr.length; ix++ )
  {
    if( arr[ ix ].id.equals( obj.id ) )
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
