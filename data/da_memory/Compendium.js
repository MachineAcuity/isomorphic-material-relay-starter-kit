/* @flow weak */

import { Uuid } from '../da_cassandra/_client.js';

import Compendium from '../model/Compendium'


var Compendium_listById = { };
var Compendium_IDsByUser = { };


// Data access functions

function DA_Compendium_add_no_promise( fields )
{
  var a_Compendium = new Compendium( fields );

  a_Compendium.id = Uuid.random( );

  Compendium_listById[ a_Compendium.id ] = a_Compendium;

  let a_Compendium_IDsByUser = Compendium_IDsByUser[ a_Compendium.Compendium_User_id ];
  if( a_Compendium_IDsByUser == null )
    a_Compendium_IDsByUser = Compendium_IDsByUser[ a_Compendium.Compendium_User_id ] = [ ];

  a_Compendium_IDsByUser.push( a_Compendium.id );

  return a_Compendium;
}

export function DA_Compendium_add( User_id, fields )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    DA_Compendium_add_no_promise( fields );

    resolve( );
  }, 100 ) );
}

export function DA_Compendium_update( User_id, id, fields )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    var a_Compendium = Compendium_listById[ id ];

    a_Compendium.Compendium_FirstTextInput          = fields.Compendium_FirstTextInput;
    a_Compendium.Compendium_RangedNumber            = fields.Compendium_RangedNumber;
    a_Compendium.Compendium_Excitement              = fields.Compendium_Excitement;
    a_Compendium.Compendium_FollowUpQuestion        = fields.Compendium_FollowUpQuestion;
    a_Compendium.Compendium_FavoriteMammal          = fields.Compendium_FavoriteMammal;
    a_Compendium.Compendium_FavoriteMammalOtherText = fields.Compendium_FavoriteMammalOtherText;
    a_Compendium.Compendium_LastText                = fields.Compendium_LastText;
    a_Compendium.Compendium_LikedSunset_Ocean       = fields.Compendium_LikedSunset_Ocean;
    a_Compendium.Compendium_LikedSunset_Lake        = fields.Compendium_LikedSunset_Lake;
    a_Compendium.Compendium_LikedSunset_Mountains   = fields.Compendium_LikedSunset_Mountains;
    a_Compendium.Compendium_LikedSunset_Plains      = fields.Compendium_LikedSunset_Plains;
    a_Compendium.Compendium_LikedSunset_Purple      = fields.Compendium_LikedSunset_Purple;
    a_Compendium.Compendium_LikedSunset_Green       = fields.Compendium_LikedSunset_Green;
    a_Compendium.Compendium_LikedSunset_Other       = fields.Compendium_LikedSunset_Other;
    a_Compendium.Compendium_LikedSunset_OtherText   = fields.Compendium_LikedSunset_OtherText;

    resolve( );
  }, 100 ) );
}

export function DA_Compendium_get( User_id, id )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    resolve( Compendium_listById[ id ] );
  }, 100 ) );
}

export function DA_Compendium_list_get( Compendium_User_id )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    let a_Compendium_IDsByUser = Compendium_IDsByUser[ Compendium_User_id ];

    if( a_Compendium_IDsByUser == null )
    {
      DA_Compendium_add_no_promise( {
        id: Uuid.random( ),
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
      } );

      // Should not be null any more
      a_Compendium_IDsByUser = Compendium_IDsByUser[ Compendium_User_id ];
    }

    resolve( a_Compendium_IDsByUser.map( id => Compendium_listById[ id ] ) );
  }, 100 ) );
}
