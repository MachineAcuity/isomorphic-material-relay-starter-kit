/* @flow weak */

import bcrypt from 'bcrypt';
import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import ViewerType from '../../../../graphql/type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'Viewer_updatePassword',
  inputFields: {
    id:                           { type: new GraphQLNonNull( GraphQLID ) },
    User_AccountPassword_Current: { type: new GraphQLNonNull( GraphQLString ) },
    User_AccountPassword:         { type: new GraphQLNonNull( GraphQLString ) },
  },
  outputFields: {
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, { rootValue: {user_id, objectManager} } ) => objectManager.getOneById( 'User', user_id )
    },
  },
  mutateAndGetPayload: ( { id, User_AccountPassword_Current, User_AccountPassword }, { rootValue: {user_id, objectManager} } ) =>
  {
    var local_id = fromGlobalId( id ).id;

    console.log( 'TODO: Must verify current password:' + User_AccountPassword_Current );

    // TODO: Also introduce a second delay

    return new Promise( ( resolve ) => {
      bcrypt.hash( User_AccountPassword, 8, ( err, User_AccountPassword ) => resolve( User_AccountPassword ) );
    } )
    .then( ( User_AccountPassword ) => objectManager.update( 'User', {
      id: local_id,
      User_AccountPassword,
    } ) )
    .then( ( ) => {
      return {local_id};
    } )
    ;
  },
} );
