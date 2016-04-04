/* @flow weak */

import { GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import { connectionArgs, connectionFromArray } from "graphql-relay";

import ToDosConnection from "./ToDosConnection";


export default {
  ToDos: {
    type: ToDosConnection.connectionType,
    args: {
      status: {
        type: GraphQLString,
        defaultValue: 'any',
      },
      ...connectionArgs,
    },
    resolve: ( obj, { status, ...args }, { rootValue: {user_id, objectManager} } ) => {
      return objectManager.getListBy( 'ToDo', 'ToDo_User_id', user_id.toString( ) )
      .then( ( arr ) => connectionFromArray( arr.filter( a_ToDo => status === 'any' || ( a_ToDo.ToDo_Complete === ( status === 'completed' ) ) ), args ) )
    }
  },
  ToDo_TotalCount: {
    type: GraphQLInt,
    resolve: ( obj, { ...args }, { rootValue: {user_id, objectManager} } ) => objectManager.getListBy( 'ToDo', 'ToDo_User_id', user_id.toString( ) ).then( ( arr ) => arr.length )
  },
  ToDo_CompletedCount: {
    type: GraphQLInt,
    resolve: ( obj, { ...args }, { rootValue: {user_id, objectManager} } ) => objectManager.getListBy( 'ToDo', 'ToDo_User_id', user_id.toString( ) ).then( ( arr ) => arr.filter( a_ToDo => a_ToDo.ToDo_Complete ).length )
  },
}
