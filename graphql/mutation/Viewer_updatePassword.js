/* @flow weak */

import bcrypt from 'bcrypt';
import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import ViewerType from '../type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'Viewer_updatePassword',
  inputFields: {
    id:              { type: new GraphQLNonNull( GraphQLID ) },
    User_Password:   { type: new GraphQLNonNull( GraphQLString ) },
  },
  outputFields: {
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, { rootValue: {user_id, objectManager} } ) => objectManager.getOneById( 'User', user_id )
    },
  },
  mutateAndGetPayload: ( { id, User_Password, }, { rootValue: {user_id, objectManager} } ) =>
  {
    var local_id = fromGlobalId( id ).id;

    return new Promise( ( resolve ) => {
      bcrypt.hash( User_Password, 8, ( err, password ) => resolve( password ) );
    } )
    .then( ( password ) => objectManager.update( 'User', {
      id: local_id,
      password,
    } ) )
    .then( ( ) => {
      return {local_id};
    } )
    ;
  },
} );
