/* @flow weak */

import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLBoolean, GraphQLID, GraphQLNonNull } from "graphql";

import ToDoType from '../type/ToDoType';
import ViewerType from '../../../../graphql/type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'ToDo_updateStatus',
  inputFields: {
    ToDo_Complete: { type: new GraphQLNonNull( GraphQLBoolean ) },
    id: { type: new GraphQLNonNull( GraphQLID ) },
  },
  outputFields: {
    ToDo: {
      type: ToDoType,
      resolve: ( {local_id}, { ...args }, { rootValue: {user_id} } ) => DA_ToDo_get( user_id, local_id ),
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, { rootValue: {user_id, objectManager} } ) => objectManager.getOneById( 'User', user_id )
    },
  },
  mutateAndGetPayload: ( { id, ToDo_Complete }, { rootValue: {user_id} } ) => {
    var local_id = fromGlobalId(id).id;
    return DA_ToDo_update( user_id, local_id, { ToDo_Complete: ToDo_Complete } )
    .then( ( ) => ( {local_id} ) )
    ;
  },
} );
