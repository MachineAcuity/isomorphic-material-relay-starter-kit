/* @flow weak */

import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import { DA_User_get, DA_User_update } from '../../data/da/User';

import ViewerType from '../type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'Viewer_update',
  inputFields: {
    id:                 { type: new GraphQLNonNull( GraphQLID ) },
    User_DisplayName:   { type: new GraphQLNonNull( GraphQLString ) },
    User_ProfilePhoto:  { type: new GraphQLNonNull( GraphQLString ) },
    User_Email:         { type: new GraphQLNonNull( GraphQLString ) },
    User_Locale:        { type: new GraphQLNonNull( GraphQLString ) },
  },
  outputFields: {
    Viewer: {
      type: ViewerType,
      resolve: ( {localId}, { ...args }, { rootValue: {user_id} } ) => DA_User_get( user_id, localId ),
    },
  },
  mutateAndGetPayload: ( {
    id,
    User_DisplayName,
    User_ProfilePhoto,
    User_Email,
    User_Locale,
  }, { rootValue: {user_id} } ) => {
    var localId = fromGlobalId( id ).id;
    return DA_User_update(
      user_id,
      localId,
      {
        User_DisplayName,
        User_ProfilePhoto,
        User_Email,
        User_Locale,
      }
    )
    .then( ( ) => {
      return {localId};
    } )
    ;
  },
} );
