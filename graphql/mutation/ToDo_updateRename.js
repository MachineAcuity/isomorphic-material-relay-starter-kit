/* @flow weak */

import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import { DA_User_get } from '../../data/da/User';
import { DA_ToDo_get, DA_ToDo_update } from '../../data/da/ToDo';

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
      resolve: ( {localToDoId}, { ...args }, { rootValue: {user_id} } ) => DA_ToDo_get( user_id, localToDoId ),
    }
  },
  mutateAndGetPayload: ( {id, ToDo_Text}, { rootValue: {user_id} } ) => {
    var localToDoId = fromGlobalId(id).id;
    return DA_ToDo_update( user_id, localToDoId, { ToDo_Text: ToDo_Text } )
    .then( ( ) => ( {localToDoId} ) )
    ;
  },
} );
