/* @flow weak */

import bcrypt from 'bcrypt';
import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import ViewerType from '../../../../graphql/type/ViewerType';

import delayPromise from '../../../../scripts/delayPromise';


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
    ErrorMessage: {
      type: GraphQLString,
      resolve: ( parent ) => parent.ErrorMessage,
    }
  },
  mutateAndGetPayload: ( { id, User_AccountPassword_Current, User_AccountPassword }, { rootValue: {user_id, objectManager} } ) =>
  {
    let local_id = fromGlobalId( id ).id;
    let ErrorMessage = ''; // No error if empty

    console.log( 'TODO: Must verify current password:' + User_AccountPassword_Current );

    return delayPromise( 1000 ) // Wait for a second to slow down a possible potential force attack
    .then( new Promise( ( resolve ) => {
      bcrypt.hash( User_AccountPassword, 8, ( err, User_AccountPassword ) => resolve( User_AccountPassword ) );
    } ) )
    .then( ( User_AccountPassword ) => objectManager.update( 'User', {
      id: local_id,
      User_AccountPassword,
    } ) )
    .then( ( ) => {
      return { ErrorMessage };
    } )
    ;
  },
} );
