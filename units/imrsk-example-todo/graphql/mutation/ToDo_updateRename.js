/* @flow weak */

import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import ToDoType from '../type/ToDoType';

export default mutationWithClientMutationId( {
  name: 'ToDo_updateRename',
  inputFields: {
    id: { type: new GraphQLNonNull( GraphQLID ) },
    ToDo_Text: { type: new GraphQLNonNull( GraphQLString ) },
  },
  outputFields: {
    ToDo: {
      type: ToDoType,
      resolve: ( {local_id}, { ...args }, { rootValue: {user_id} } ) => DA_ToDo_get( user_id, local_id ),
    }
  },
  mutateAndGetPayload: ( {id, ToDo_Text}, { rootValue: {user_id} } ) => {
    var local_id = fromGlobalId(id).id;
    return DA_ToDo_update( user_id, local_id, { ToDo_Text: ToDo_Text } )
    .then( ( ) => ( {local_id} ) )
    ;
  },
} );
