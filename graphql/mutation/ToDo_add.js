/* @flow weak */

import chalk from 'chalk';

import { fromGlobalId, mutationWithClientMutationId, cursorForObjectInConnection } from "graphql-relay";
import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import { cursorForObjectInConnectionWithUuidComparison } from '../helper/mutation_helper';
import { DA_User_get } from '../../data/da/User';
import { DA_ToDo_add, DA_ToDo_get, DA_ToDo_list_get } from '../../data/da/ToDo';

import ToDosConnection from '../type/ToDosConnection';
import ViewerType from '../type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'ToDo_add',
  inputFields: {
    ToDo_Text: { type: new GraphQLNonNull( GraphQLString ) }
  },
  outputFields: {
    ToDosEdge: {
      type: ToDosConnection.edgeType,
      resolve: ( {localToDoId}, args, { rootValue: {user_id} } ) =>
      {
        let a_ToDo;
        return DA_ToDo_get( user_id, localToDoId )
        .then( ( retrieved_ToDo ) => {
          a_ToDo = retrieved_ToDo;
        } )
        .then( ( ) => DA_ToDo_list_get( user_id ) )
        .then( ( arr_ToDo ) => ( {
          cursor: cursorForObjectInConnectionWithUuidComparison( arr_ToDo, a_ToDo ),
          node: a_ToDo,
        } ) )
        ;
      }
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DA_User_get( user_id )
    },
  },
  mutateAndGetPayload: ( {ToDo_Text}, { rootValue: {user_id} } ) =>
    DA_ToDo_add( user_id, { ToDo_User_id: user_id, ToDo_Text: ToDo_Text, ToDo_Complete: false } )
    .then( ( localToDoId ) => ( {localToDoId} ) )
} );
