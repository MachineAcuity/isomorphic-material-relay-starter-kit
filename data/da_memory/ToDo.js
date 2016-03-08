/* @flow weak */

import { Uuid } from '../da_cassandra/_client.js';

import ToDo from '../model/ToDo'


// Mock data

var ToDo_listById = { };
var ToDo_id_by_User_id = { };


// Data access functions

export function DA_ToDo_add( User_id, fields )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    var a_ToDo = new ToDo( fields );

    a_ToDo.id = Uuid.random( );

    ToDo_listById[ a_ToDo.id ] = a_ToDo;

    let a_ToDo_id_by_User_id = ToDo_id_by_User_id[ a_ToDo.ToDo_User_id ];
    if( a_ToDo_id_by_User_id == null )
      a_ToDo_id_by_User_id = ToDo_id_by_User_id[ a_ToDo.ToDo_User_id ] = [ ];

    a_ToDo_id_by_User_id.push( a_ToDo.id );

    resolve( a_ToDo.id );
  }, 100 ) );
}

export function DA_ToDo_update( User_id, id, fields )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    var a_ToDo = ToDo_listById[ id.toString( ) ];

    if( 'ToDo_Complete' in fields ) a_ToDo.ToDo_Complete = fields.ToDo_Complete;
    if( 'ToDo_Text' in fields ) a_ToDo.ToDo_Text = fields.ToDo_Text;

    resolve( );
  }, 100 ) );
}

export function DA_ToDo_get( User_id, id )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    resolve( ToDo_listById[ id.toString( ) ] );
  }, 100 ) );
}

export function DA_ToDo_delete( User_id, id )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    var ix_ToDo = ToDo_id_by_User_id[ User_id ].indexOf( id.toString( ) );

    if( ix_ToDo !== -1 )
      ToDo_id_by_User_id[ User_id ].splice( ix_ToDo, 1 );

    delete ToDo_listById[ id.toString( ) ];

    resolve( );
  }, 100 ) );
}

export function DA_ToDo_list_get( User_id, status = 'any' )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    let arr_ToDo;
    let a_ToDo_id_by_User_id = ToDo_id_by_User_id[ User_id ];
    if( a_ToDo_id_by_User_id == null )
      arr_ToDo = [ ];
    else
      arr_ToDo = a_ToDo_id_by_User_id.map( id => ToDo_listById[ id ] );

    if( status !== 'any' )
    {
      let statusCheck = ( status === 'completed' );
      arr_ToDo = arr_ToDo.filter( a_ToDo => a_ToDo && a_ToDo.ToDo_Complete === statusCheck );
    }

    resolve( arr_ToDo );
  }, 100 ) );
}

export function DA_ToDo_list_updateMarkAll( User_id, ToDo_Complete )
{
  return DA_ToDo_list_get( User_id )
  .then( ( arr_ToDo ) => {
    var changedToDos = [ ];
    arr_ToDo.forEach( a_ToDo =>
    {
      if( a_ToDo.ToDo_Complete !== ToDo_Complete )
      {
        a_ToDo.ToDo_Complete = ToDo_Complete;
        changedToDos.push( a_ToDo );
      }
    } );
    return( changedToDos.map( a_ToDo => a_ToDo.id ) );
  } );
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
