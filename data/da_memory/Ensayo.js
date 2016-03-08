/* @flow weak */

import { Uuid } from '../da_cassandra/_client.js';

import Ensayo from '../model/Ensayo'


// Mock data

var Ensayo_listById = { };
var Ensayo_id_by_User_id = { };

function EnsayoAddMock( fields )
{
  var a_Ensayo = new Ensayo( fields );

  Ensayo_listById[ a_Ensayo.id ] = a_Ensayo;

  let a_Ensayo_id_by_User_id = Ensayo_id_by_User_id[ a_Ensayo.Ensayo_User_id ];
  if( a_Ensayo_id_by_User_id == null )
    a_Ensayo_id_by_User_id = Ensayo_id_by_User_id[ a_Ensayo.Ensayo_User_id ] = [ ];

  a_Ensayo_id_by_User_id.push( a_Ensayo.id );
}

var userID_0 = Uuid.fromString( '00000000-0000-0000-0000-000000000000' );

EnsayoAddMock( {
  id:               Uuid.fromString( 'fa666f10-483d-43bd-8ee2-4e4921c9cf82' ),
  Ensayo_User_id:   userID_0,
  Ensayo_Title:     'Facebook just taught us all how to build websites',
  Ensayo_Description:  'Overview of the advantages of Relay over previous approaches focusing on the components declaring their data needs and use of GraphQL.',
  Ensayo_Content:   'In 2003, Brad Fitzpatrick released Memcached, and began talking about LiveJournal architecture. This became the prototype for the next generation of sites and apps, and is still largely the same way web apps are built today. https://blog.gyrosco.pe/facebook-just-taught-us-all-how-to-build-websites-51f1e7e996f2#.m7sk5nj5q'
} );

EnsayoAddMock( {
  id:               Uuid.fromString( 'fa666f10-483d-43bd-8ee2-4e4921c9cf83' ),
  Ensayo_User_id:   userID_0,
  Ensayo_Title:     'Advantages of NoSQL with Cassandra over MySQL',
  Ensayo_Description:  'Reasons why new projects should be started using Cassandra instead of MySQL',
  Ensayo_Content:   'Scalability, scalability, scalability ... I like it, do Cassandra allow me to store my data on different servers (without SAN) ? I am not talking here of replication, I speak of a single NoSQL server across multiple physical server.'
} );

EnsayoAddMock( {
  id:               Uuid.fromString( 'fa666f10-483d-43bd-8ee2-4e4921c9cf84' ),
  Ensayo_User_id:   userID_0,
  Ensayo_Title:     'React Adoption Grows',
  Ensayo_Description:  'Big Companies Adopting React',
  Ensayo_Content:   'This has been an exciting summer as four big companies: Yahoo, Mozilla, Airbnb and Reddit announced that they were using React! .... We are building an ambitious new web app, where the UI complexity represents most of the app complexity overall. It includes a tremendous amount of UI widgets as well as a lot rules on what-to-show-when. This is exactly the sort of situation React.js was built to simplify.'
} );

EnsayoAddMock( {
  id:               Uuid.fromString( 'fa666f10-483d-43bd-8ee2-4e4921c9cf85' ),
  Ensayo_User_id:   userID_0,
  Ensayo_Title:     'React Native',
  Ensayo_Description:  'The Killer Feature that Nobody Talks About by Robbie McCorkell',
  Ensayo_Content:   'At the end of January I was lucky enough to go to React conf at Facebook HQ in Menlo Park. This was my first tech conference, and it was a great and inspiring experience for me. The talks were excellent and I recommend everybody check out the videos, but the talks that really stole the show were the ones on React Native. http://red-badger.com/blog/2015/03/04/react-native-the-killer-feature-that-nobody-talks-about/'
} );

// Data access functions

export function DA_Ensayo_add( User_id, fields )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    var a_Ensayo = new Ensayo( fields );

    a_Ensayo.id = Uuid.random( );

    Ensayo_listById[ a_Ensayo.id ] = a_Ensayo;

    let a_Ensayo_id_by_User_id = Ensayo_id_by_User_id[ a_Ensayo.Ensayo_User_id ];
    if( a_Ensayo_id_by_User_id == null )
      a_Ensayo_id_by_User_id = Ensayo_id_by_User_id[ a_Ensayo.Ensayo_User_id ] = [ ];

    a_Ensayo_id_by_User_id.push( a_Ensayo.id );

    resolve( a_Ensayo.id );
  }, 100 ) );
}

export function DA_Ensayo_update( User_id, id, fields )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    var a_Ensayo = Ensayo_listById[ id.toString( ) ];

    if( 'Ensayo_Title' in fields ) a_Ensayo.Ensayo_Title = fields.Ensayo_Title;
    if( 'Ensayo_Description' in fields ) a_Ensayo.Ensayo_Description = fields.Ensayo_Description;
    if( 'Ensayo_Content' in fields ) a_Ensayo.Ensayo_Content = fields.Ensayo_Content;

    resolve( );
  }, 100 ) );
}

export function DA_Ensayo_get( User_id, id )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    resolve( Ensayo_listById[ id.toString( ) ] );
  }, 100 ) );
}

export function DA_Ensayo_delete( User_id, id )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    var ix_Ensayo = Ensayo_id_by_User_id[ User_id ].indexOf( id.toString( ) );

    if( ix_Ensayo !== -1 )
      Ensayo_id_by_User_id[ User_id ].splice( ix_Ensayo, 1 );

    delete Ensayo_listById[ id.toString( ) ];

    resolve( );
  }, 100 ) );
}

export function DA_Ensayo_list_get( User_id )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    let arr_Ensayo;
    let a_Ensayo_id_by_User_id = Ensayo_id_by_User_id[ User_id ];
    if( a_Ensayo_id_by_User_id == null )
      arr_Ensayo = [ ];
    else
      arr_Ensayo = a_Ensayo_id_by_User_id.map( id => Ensayo_listById[ id ] );

    resolve( arr_Ensayo );
  }, 100 ) );
}
