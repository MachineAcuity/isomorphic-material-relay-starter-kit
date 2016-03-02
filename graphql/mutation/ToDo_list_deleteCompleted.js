/* @flow weak */

import { toGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";

import { DA_User_get } from '../../data/da/User';
import { DA_ToDo_list_deleteCompleted } from '../../data/da/ToDo';

import ViewerType from '../type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'ToDo_list_deleteCompleted',
  outputFields: {
    deletedToDoIds: {
      type: new GraphQLList( GraphQLString ),
      resolve: ( {deletedToDoIds} ) => deletedToDoIds,
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DA_User_get( user_id )
    },
  },
  mutateAndGetPayload: ( input, { rootValue: {user_id} } ) =>
  {
    var deletedToDoLocalIds = DA_ToDo_list_deleteCompleted( user_id );
    var deletedToDoIds = deletedToDoLocalIds.map( toGlobalId.bind( null, 'ToDo' ) );
    return {deletedToDoIds};
  }
} );
