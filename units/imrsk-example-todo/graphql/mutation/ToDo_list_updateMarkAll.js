/* @flow weak */

import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";

import ToDo_list_updateMarkAll from '../helper/ToDo_list_updateMarkAll';
import ToDoType from '../type/ToDoType';
import ViewerType from '../../../../graphql/type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'ToDo_list_updateMarkAll',
  inputFields: {
    ToDo_Complete: { type: new GraphQLNonNull( GraphQLBoolean ) },
  },
  outputFields: {
    changedToDos: {
      type: new GraphQLList(ToDoType),
      resolve: ( {changedToDoLocalIds}, args, { rootValue: {user_id, objectManager} } ) => changedToDoLocalIds.map( local_id => objectManager.getOneById( 'ToDo', local_id ) ),
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, { rootValue: {user_id, objectManager} } ) => objectManager.getOneById( 'User', user_id )
    },
  },
  mutateAndGetPayload: ( {ToDo_Complete}, { rootValue: {user_id, objectManager} } ) =>
  {
    return ToDo_list_updateMarkAll( user_id, objectManager, ToDo_Complete )
    .then( ( changedToDoLocalIds ) => ( {changedToDoLocalIds} ) )
    ;
  }
} );
