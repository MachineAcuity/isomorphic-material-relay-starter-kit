/* @flow weak */

import { runQuery, runQueryOneResult, runQueryNoResult, Uuid } from './_client.js';

import ToDo from '../model/ToDo'


// Data access functions

export function DA_ToDo_add( User_id, fields )
{
  const id = Uuid.random( );
  let cqlText = 'INSERT INTO "ToDo" (id, "ToDo_User_id", "ToDo_Text", "ToDo_Complete" ) VALUES (?, ?, ?, false);';
  let cqlParams = [
    id,
    fields.ToDo_User_id,
    fields.ToDo_Text,
  ];
  return runQueryNoResult( cqlText, cqlParams )
  .then( ( ) => {
    return id;
  } )
  ;
}

export function DA_ToDo_update( User_id, id, fields : any )
{
  // We will not update ToDo_User_id since it makes no sense to update it
  let cqlText = 'UPDATE "ToDo" SET ';
  let cqlParams = [ ];

  let followingItem = false;

  if( 'ToDo_Text' in fields )
  {
    if( followingItem ) cqlText += ', ';
    cqlText += '"ToDo_Text" = ?';
    cqlParams.push( fields.ToDo_Text );
    followingItem = true;
  }
  if( 'ToDo_Complete' in fields )
  {
    if( followingItem ) cqlText += ', ';
    cqlText += '"ToDo_Complete" = ?';
    cqlParams.push( fields.ToDo_Complete );
    followingItem = true;
  }

  cqlText += ' WHERE id = ?;';
  cqlParams.push( id );

  return runQueryNoResult( cqlText, cqlParams );
}

export function DA_ToDo_get( User_id, id )
{
  const cqlText = 'SELECT * FROM "ToDo" WHERE id = ?;';
  const cqlParams = [ id ];

  return runQueryOneResult( ToDo, cqlText, cqlParams );
}

export function DA_ToDo_delete( User_id, id )
{
  const cqlText = 'DELETE FROM "ToDo" WHERE id = ?;';
  const cqlParams = [ id ];

  return runQueryOneResult( ToDo, cqlText, cqlParams );
}

export function DA_ToDo_list_get( User_id, status )
{
  let cqlText = 'SELECT * FROM "ToDo" WHERE "ToDo_User_id" = ?';
  let cqlParams = [ User_id ];

  if( status != 'any' )
  {
    // Allow filtering is OK since there won't be that many ToDos per user anyway.
    cqlText += ' AND "ToDo_Complete" = ? ALLOW FILTERING';
    cqlParams.push( status === 'completed' );
  }

  cqlText += ';';

  return runQuery( ToDo, cqlText, cqlParams );
}

export function DA_ToDo_list_updateMarkAll( User_id, ToDo_Complete )
{
  console.log( "DA_ToDo_list_updateMarkAll: " + ToDo_Complete );

  var changedToDos = [ ];
  return DA_ToDo_list_get( User_id )
  .then( ( arr_ToDo ) => {
    let promisedToDoUpdates = [ ];
    arr_ToDo.forEach( a_ToDo =>
    {
      if( a_ToDo.ToDo_Complete !== ToDo_Complete )
      {
        a_ToDo.ToDo_Complete = ToDo_Complete;
        changedToDos.push( a_ToDo );

        console.log( "DA_ToDo_list_updateMarkAll: " + a_ToDo.id.toString( ));
        promisedToDoUpdates.push( DA_ToDo_update(
          User_id,
          a_ToDo.id,
          { ToDo_Complete: ToDo_Complete }
        ) );
      }
    } );
    console.log( "DA_ToDo_list_updateMarkAll RET changedToDos:" + JSON.stringify( changedToDos ) );
    return(
      Promise.all( promisedToDoUpdates )
    );
  } )
  .then( ( arr ) => {
    console.log( "DA_ToDo_list_updateMarkAll FINALE: " + ToDo_Complete );
    console.log( "changedToDos:" + JSON.stringify( changedToDos ) );
    return changedToDos.map( a_ToDo => a_ToDo.id );
  } )
  ;
}

export function DA_ToDo_list_deleteCompleted( User_id )
{
  throw new Error( "The code below should be re-written with promises" );
  /*
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    var ToDo_listToRemove = DA_ToDo_list_get( User_id ).filter( a_ToDo => a_ToDo.ToDo_Complete );
    ToDo_listToRemove.forEach( a_ToDo => DA_ToDo_delete( User_id, a_ToDo.id ) );
    resolve( ToDo_listToRemove.map( a_ToDo => a_ToDo.id ) );
  }, 100 ) );
  */
}
