/* @flow weak */

import { runQuery, runQueryOneResult, runQueryNoResult, Uuid } from './_client.js';

import Translaticiarum from '../model/Translaticiarum'


// Data access functions

export function DA_Translaticiarum_add( User_id : Uuid, fields : {
  Translaticiarum_User_id: Uuid,
  Translaticiarum_Date: string,
  Translaticiarum_Time: string,
  Translaticiarum_Type: number,
} ) : Promise
{
  const id = Uuid.random( );
  let cqlText = 'INSERT INTO "Translaticiarum" (id, "Translaticiarum_User_id", "Translaticiarum_Date", "Translaticiarum_Time", "Translaticiarum_Type" ) VALUES (?, ?, ?, ?, ?);';
  let cqlParams = [
    id,
    fields.Translaticiarum_User_id,
    fields.Translaticiarum_Date,
    fields.Translaticiarum_Time,
    fields.Translaticiarum_Type,
  ];
  return runQueryNoResult( cqlText, cqlParams )
  .then( ( ) => {
    return id;
  } )
  ;
}

export function DA_Translaticiarum_update( User_id : Uuid, id : Uuid, fields : any ) : Promise
{
  // We will not update Translaticiarum_User_id since it makes no sense to update it
  let cqlText = 'UPDATE "Translaticiarum" SET ';
  let cqlParams = [ ];

  let followingItem = false;

  if( 'Translaticiarum_Date' in fields )
  {
    if( followingItem ) cqlText += ', ';
    cqlText += '"Translaticiarum_Date" = ?';
    cqlParams.push( fields.Translaticiarum_Date );
    followingItem = true;
  }
  if( 'Translaticiarum_Time' in fields )
  {
    if( followingItem ) cqlText += ', ';
    cqlText += '"Translaticiarum_Time" = ?';
    cqlParams.push( fields.Translaticiarum_Time );
    followingItem = true;
  }
  if( 'Translaticiarum_Type' in fields )
  {
    if( followingItem ) cqlText += ', ';
    cqlText += '"Translaticiarum_Type" = ?';
    cqlParams.push( fields.Translaticiarum_Type );
    followingItem = true;
  }

  cqlText += ' WHERE id = ?;';
  cqlParams.push( id );

  return runQueryNoResult( cqlText, cqlParams );
}

export function DA_Translaticiarum_get( User_id : Uuid, id : Uuid ) : Promise
{
  const cqlText = 'SELECT * FROM "Translaticiarum" WHERE id = ?;';
  const cqlParams = [ id ];

  return runQueryOneResult( Translaticiarum, cqlText, cqlParams );
}

export function DA_Translaticiarum_delete( User_id : Uuid, id : Uuid ) : Promise
{
  const cqlText = 'DELETE FROM "Translaticiarum" WHERE id = ?;';
  const cqlParams = [ id ];

  return runQueryOneResult( Translaticiarum, cqlText, cqlParams );
}

export function DA_Translaticiarum_list_get( User_id : Uuid ) : Promise
{
  let cqlText = 'SELECT * FROM "Translaticiarum" WHERE "Translaticiarum_User_id" = ?;';
  let cqlParams = [ User_id ];

  return runQuery( Translaticiarum, cqlText, cqlParams );
}
