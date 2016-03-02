/* @flow weak */

import DataLoader from 'dataloader';

import { Uuid } from '../da_cassandra/_client.js';

import { EntityAccess_get } from '../da/EntityAccess.js';

export default class EntityManagerBase
{
  entityDefinitions: any;
  Viewer_User_id: Uuid;

  constructor( Viewer_User_id: Uuid )
  {
    this.entityDefinitions = { };
    this.Viewer_User_id = Viewer_User_id;
  }

  registerEntity( entityName: string, EntityType : any )
  {
    this.entityDefinitions[ entityName ] = {
      EntityType: EntityType,
      loaders: { }
    };
  }

  getLoader( entityName: string, fieldName: string )
  {
    let loaders = this.entityDefinitions[ entityName ].loaders;

    let loader = loaders[ fieldName ];
    if( loader == null )
    {
      loader = new DataLoader( values => EntityAccess_get( this.Viewer_User_id, fieldName, values ) );
      loaders[ fieldName ] = loader;
    }

    return loader;
  }

  getOneById( entityName: string, id: Uuid )
  {
    const loader = this.getLoader( entityName, 'id' );

    return loader.load( id.toString( ) );
  }

  getListBy( entityName: string, fieldName: string, searchVaue: string )
  {
    const loader = this.getLoader( entityName, fieldName );

    return loader.load( searchVaue );
  }

  add( entityName: string, fields: any )
  {
    throw new Error( "Not supported" );
  }

  update( entityName: string, id: Uuid )
  {
    throw new Error( "Not supported" );
  }

  remove( entityName: string, id: Uuid )
  {
    throw new Error( "Not supported" );
  }

  list_get( entityName: string )
  {
    throw new Error( "Not supported" );
  }
}
