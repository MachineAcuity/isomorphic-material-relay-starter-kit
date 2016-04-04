/* @flow weak */

import { GraphQLID } from "graphql";
import { connectionArgs, connectionFromArray } from "graphql-relay";

import TranslaticiarumsConnection from "./TranslaticiarumsConnection";


export default {
  Translaticiarums: {
    type: TranslaticiarumsConnection.connectionType,
    args: { ...connectionArgs },
    resolve: ( obj, { ...args }, { rootValue: {user_id, objectManager} } ) => objectManager.getListBy( 'Translaticiarum', 'Translaticiarum_User_id', user_id.toString( ) ).then( ( arr ) => connectionFromArray( arr, args ) )
  },
}
