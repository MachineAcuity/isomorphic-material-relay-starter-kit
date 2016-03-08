/* @flow weak */

import DataLoader from 'dataloader';

import { Uuid } from '../da_cassandra/_client.js';

import {
  ObjectPersister_get,
  ObjectPersister_getList,
  ObjectPersister_add,
  ObjectPersister_update,
  ObjectPersister_remove
} from '../da/ObjectPersister.js';

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

  invalidateLoaderCache( entityName: string, fields: any )
  {
    const loaders = this.entityDefinitions[ entityName ].loaders;

    // At this moment there is no obvious way of knowing what to clear from lists, so delete them all
    loaders.loadersMultiple = { };

    const loadersSingle = loaders.loadersSingle;
    for( let loaderFieldName in loadersSingle )
    {
      if( loaderFieldName === 'id' )
        loadersSingle[ loaderFieldName ].clear( fields.id );
      else
        delete loadersSingle[ loaderFieldName ];
    }
  }

  add( entityName: string, fields: any )
  {
    const ObjectType = this.entityDefinitions[ entityName ].EntityType;

    return ObjectPersister_add( entityName, fields, ObjectType )
    .then( id => {
      fields.id = id;
      this.invalidateLoaderCache( entityName, fields );
      return id;
    } )
    ;
  }

  update( entityName: string, fields: any )
  {
    return ObjectPersister_update( entityName, fields )
    .then( ( ) => {
      this.invalidateLoaderCache( entityName, fields );
    } )
    ;
  }

  remove( entityName: string, fields: any )
  {
    return ObjectPersister_remove( entityName, fields )
    .then( ( ) => {
      this.invalidateLoaderCache( entityName, fields );
    } )
    ;
  }
}
