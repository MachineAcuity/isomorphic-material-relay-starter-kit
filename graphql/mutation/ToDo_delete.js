/* @flow weak */

import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLID, GraphQLNonNull } from "graphql";

import { DA_ToDo_delete } from '../../data/da/ToDo';

import ViewerType from '../type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'ToDo_delete',
  inputFields: {
    id: { type: new GraphQLNonNull( GraphQLID ) },
  },
  outputFields: {
    deletedToDoId: {
      type: GraphQLID,
      resolve: ( {id} ) => id,
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, { rootValue: {user_id, objectManager} } ) => objectManager.getOneById( 'User', user_id )
    },
  },
  mutateAndGetPayload: ( {id}, { rootValue: {user_id} } ) =>
  {
    var localToDoId = fromGlobalId(id).id;
    return DA_ToDo_delete( user_id, localToDoId )
    .then( ( ) => ( {id} ) )
    ;
  }
} );
