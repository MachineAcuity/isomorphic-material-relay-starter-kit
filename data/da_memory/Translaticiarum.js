/* @flow weak */

import { Uuid } from '../da_cassandra/_client.js';

import Translaticiarum from '../model/Translaticiarum'


// Mock data

var Translaticiarum_listById = { };
var Translaticiarum_id_by_User_id = { };


// Data access functions

export function DA_Translaticiarum_add( fields )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    var a_Translaticiarum = new Translaticiarum( fields );

    a_Translaticiarum.id = Uuid.random( );

    Translaticiarum_listById[ a_Translaticiarum.id ] = a_Translaticiarum;

    let a_Translaticiarum_id_by_User_id = Translaticiarum_id_by_User_id[ a_Translaticiarum.Translaticiarum_User_id ];
    if( a_Translaticiarum_id_by_User_id == null )
      a_Translaticiarum_id_by_User_id = Translaticiarum_id_by_User_id[ a_Translaticiarum.Translaticiarum_User_id ] = [ ];

    a_Translaticiarum_id_by_User_id.push( a_Translaticiarum.id );

    resolve( a_Translaticiarum.id );
  }, 100 ) );
}

export function DA_Translaticiarum_update( User_id, id, fields )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    var a_Translaticiarum = Translaticiarum_listById[ id.toString( ) ];

    if( 'Translaticiarum_Date' in fields ) a_Translaticiarum.Translaticiarum_Date = fields.Translaticiarum_Date;
    if( 'Translaticiarum_Time' in fields ) a_Translaticiarum.Translaticiarum_Time = fields.Translaticiarum_Time;
    if( 'Translaticiarum_Type' in fields ) a_Translaticiarum.Translaticiarum_Type = fields.Translaticiarum_Type;

    resolve( );
  }, 100 ) );
}

export function DA_Translaticiarum_get( User_id, id )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    resolve( Translaticiarum_listById[ id.toString( ) ] );
  }, 100 ) );
}

export function DA_Translaticiarum_delete( User_id, id )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    var ix_Translaticiarum = Translaticiarum_id_by_User_id[ User_id ].indexOf( id.toString( ) );

    if( ix_Translaticiarum !== -1 )
      Translaticiarum_id_by_User_id[ User_id ].splice( ix_Translaticiarum, 1 );

    delete Translaticiarum_listById[ id.toString( ) ];

    resolve( );
  }, 100 ) );
}

export function DA_Translaticiarum_list_get( User_id )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    let arr_Translaticiarum;
    let a_Translaticiarum_id_by_User_id = Translaticiarum_id_by_User_id[ User_id ];
    if( a_Translaticiarum_id_by_User_id == null )
      arr_Translaticiarum = [ ];
    else
      arr_Translaticiarum = a_Translaticiarum_id_by_User_id.map( id => Translaticiarum_listById[ id ] );

    resolve( arr_Translaticiarum );
  }, 100 ) );
}
