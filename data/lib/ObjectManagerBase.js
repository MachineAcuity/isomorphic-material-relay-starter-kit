/* @flow weak */

import DataLoader from 'dataloader';

import { Uuid } from '../da_cassandra/_client.js';

import { ObjectPersister_get, ObjectPersister_getList } from '../da/ObjectPersister.js';

export default class ObjectManagerBase
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
      loaders: { loadersSingle: { }, loadersMultiple: { } }
    };
  }

  getLoader( entityName: string, fieldName: string, multipleResults: boolean )
  {
    const loaders = this.entityDefinitions[ entityName ].loaders;
    const ObjectType = this.entityDefinitions[ entityName ].EntityType;

    let loadersList = multipleResults ? loaders.loadersMultiple : loaders.loadersSingle;
    let loader = loadersList[ fieldName ];
    if( loader == null )
    {
      if( multipleResults )
        loader = new DataLoader( values => ObjectPersister_getList( entityName, ObjectType, fieldName, values ) );
      else
        loader = new DataLoader( values => ObjectPersister_get( entityName, ObjectType, fieldName, values ) );

      loadersList[ fieldName ] = loader;
    }

    return loader;
  }

  getOneById( entityName: string, id: Uuid )
  {
    const loader = this.getLoader( entityName, 'id', false );

    return loader.load( id.toString( ) );
  }

  getListBy( entityName: string, fieldName: string, value: string )
  {
    const loader = this.getLoader( entityName, fieldName, true );

    return loader.load( value );
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
