/* @flow weak */

import DataLoader from 'dataloader';

import ObjectPersisterCassandra from './ObjectPersisterCassandra.js';
import ObjectPersisterMemory from './ObjectPersisterMemory.js';

import User from '../model/User';
import { Uuid } from '../lib/CassandraClient.js';


// Read environment
require( 'dotenv' ).load( );

// Anonymous user
const User_0 = new User( {
  id: Uuid.fromString( '00000000-0000-0000-0000-000000000000' ),
  User_AccountName: '',
  password: '',
  User_DisplayName: 'Anonymous',
  "User_ProfilePhoto": '',
  User_Email: '',
  User_Locale: '',
  User_AuthToken: process.env.ANONYMOUS_USER_AUTH_TOKEN
} );

// Set persistence
const ObjectPersister = (process.env.OBJECT_PERSISTENCE == 'memory') ? ObjectPersisterMemory : ObjectPersisterCassandra;

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
        loader = new DataLoader( values => ObjectPersister.ObjectPersister_getList( entityName, ObjectType, fieldName, values ) );
      else
        loader = new DataLoader( values => ObjectPersister.ObjectPersister_get( entityName, ObjectType, fieldName, values ) );

      loadersList[ fieldName ] = loader;
    }

    return loader;
  }

  getOneById( entityName: string, id: Uuid )
  {
    // Special hack for anonymous users
    if( entityName === 'User' && id == '00000000-0000-0000-0000-000000000000' )
      return Promise.resolve( User_0 );
    // For all non-user, non 0 ids, load from data loader
    else
    {
      const loader = this.getLoader( entityName, 'id', false );

      if( id instanceof Uuid )
        id = id.toString( );

      return loader.load( id );
    }
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

    return ObjectPersister.ObjectPersister_add( entityName, fields, ObjectType )
    .then( id => {
      fields.id = id;
      this.invalidateLoaderCache( entityName, fields );
      return id;
    } )
    ;
  }

  update( entityName: string, fields: any )
  {
    return ObjectPersister.ObjectPersister_update( entityName, fields )
    .then( ( ) => {
      this.invalidateLoaderCache( entityName, fields );
    } )
    ;
  }

  remove( entityName: string, fields: any )
  {
    return ObjectPersister.ObjectPersister_remove( entityName, fields )
    .then( ( ) => {
      this.invalidateLoaderCache( entityName, fields );
    } )
    ;
  }
}
