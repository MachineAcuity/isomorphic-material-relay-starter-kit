/* @flow weak */

import { runQuery, runQueryOneResult, runQueryNoResult, Uuid } from './_client.js';

import Compendium from '../model/Compendium'

// Data access functions

export function DA_Compendium_add( User_id : Uuid, fields : any ) : Promise
{
  let cqlText = 'INSERT INTO "Compendium" (id, "Compendium_User_id", "Compendium_FirstTextInput", "Compendium_RangedNumber", "Compendium_Excitement", "Compendium_FollowUpQuestion", "Compendium_FavoriteMammal", "Compendium_FavoriteMammalOtherText", "Compendium_LastText", "Compendium_LikedSunset_Ocean", "Compendium_LikedSunset_Lake", "Compendium_LikedSunset_Mountains", "Compendium_LikedSunset_Plains", "Compendium_LikedSunset_Purple", "Compendium_LikedSunset_Green", "Compendium_LikedSunset_Other", "Compendium_LikedSunset_OtherText") VALUES (uuid(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
  let cqlParams = [
    fields.Compendium_User_id,
    fields.Compendium_FirstTextInput,
    fields.Compendium_RangedNumber,
    fields.Compendium_Excitement,
    fields.Compendium_FollowUpQuestion,
    fields.Compendium_FavoriteMammal,
    fields.Compendium_FavoriteMammalOtherText,
    fields.Compendium_LastText,
    fields.Compendium_LikedSunset_Ocean,
    fields.Compendium_LikedSunset_Lake,
    fields.Compendium_LikedSunset_Mountains,
    fields.Compendium_LikedSunset_Plains,
    fields.Compendium_LikedSunset_Purple,
    fields.Compendium_LikedSunset_Green,
    fields.Compendium_LikedSunset_Other,
    fields.Compendium_LikedSunset_OtherText,
  ];
  return runQueryNoResult( cqlText, cqlParams );
}

export function DA_Compendium_update( User_id : Uuid, id : Uuid, fields : any ) : Promise
{
  // We will not update Compendium_User_id since it makes no sense to update it
  let cqlText = 'UPDATE "Compendium" SET "Compendium_FirstTextInput" = ?, "Compendium_RangedNumber" = ?, "Compendium_Excitement" = ?, "Compendium_FollowUpQuestion" = ?, "Compendium_FavoriteMammal" = ?, "Compendium_FavoriteMammalOtherText" = ?, "Compendium_LastText" = ?, "Compendium_LikedSunset_Ocean" = ?, "Compendium_LikedSunset_Lake" = ?, "Compendium_LikedSunset_Mountains" = ?, "Compendium_LikedSunset_Plains" = ?, "Compendium_LikedSunset_Purple" = ?, "Compendium_LikedSunset_Green" = ?, "Compendium_LikedSunset_Other" = ?, "Compendium_LikedSunset_OtherText" = ? WHERE id = ?;';
  let cqlParams = [
    fields.Compendium_FirstTextInput,
    fields.Compendium_RangedNumber,
    fields.Compendium_Excitement,
    fields.Compendium_FollowUpQuestion,
    fields.Compendium_FavoriteMammal,
    fields.Compendium_FavoriteMammalOtherText,
    fields.Compendium_LastText,
    fields.Compendium_LikedSunset_Ocean,
    fields.Compendium_LikedSunset_Lake,
    fields.Compendium_LikedSunset_Mountains,
    fields.Compendium_LikedSunset_Plains,
    fields.Compendium_LikedSunset_Purple,
    fields.Compendium_LikedSunset_Green,
    fields.Compendium_LikedSunset_Other,
    fields.Compendium_LikedSunset_OtherText,
    id,
  ];
  return runQueryNoResult( cqlText, cqlParams );
}

export function DA_Compendium_get( User_id : Uuid, id : Uuid ) : Promise
{
  const cqlText = 'SELECT * FROM "Compendium" WHERE id = ?;';
  const cqlParams = [ id ];

  return runQueryOneResult( Compendium, cqlText, cqlParams );
}

export function DA_Compendium_list_get( Compendium_User_id : Uuid, notMyFirstRodeo : boolean ) : Promise
{
  const cqlText = 'SELECT * FROM "Compendium" WHERE "Compendium_User_id" = ?;';
  const cqlParams = [ Compendium_User_id ];

  return runQuery( Compendium, cqlText, cqlParams )
  .then( ( list_Compendium ) => {

    if( list_Compendium.length == 0 && ( ! notMyFirstRodeo ) )
      return DA_Compendium_add( Compendium_User_id, {
        Compendium_User_id: Compendium_User_id,
        Compendium_FirstTextInput: "",
        Compendium_RangedNumber: 0,
        Compendium_Excitement: 0,
        Compendium_FollowUpQuestion: "",
        Compendium_FavoriteMammal: 0,
        Compendium_FavoriteMammalOtherText: "",
        Compendium_LastText: "",
        Compendium_LikedSunset_Ocean: false,
        Compendium_LikedSunset_Lake: false,
        Compendium_LikedSunset_Mountains: false,
        Compendium_LikedSunset_Plains: false,
        Compendium_LikedSunset_Purple: false,
        Compendium_LikedSunset_Green: false,
        Compendium_LikedSunset_Other: false,
        Compendium_LikedSunset_OtherText: "",
      } )
      .then( ( ) => {
        // TODO Calling it recursively, knowing that the entry is written this time and it won't be a loop.
        // Depending how Cassandra is configured, that may possibly not be true. Just in case of something
        // going wrong in order to prevent and endless recusrion, let the function know it's not the first time
        // it is running. That said, the screen will fail because the edge will have no nodes.

        // A better approach will be to create the record and give it UUID generated on the client, this way
        // a list can be returned containing this record, without having a query back to the database be able
        // to retrieve it.
        return DA_Compendium_list_get( Compendium_User_id, true );
      } )
      ;
    else
      return list_Compendium;
  } )
  ;
}
