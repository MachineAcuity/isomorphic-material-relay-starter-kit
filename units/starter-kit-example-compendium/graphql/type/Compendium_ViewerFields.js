/* @flow weak */

import { GraphQLID } from "graphql";
import { connectionArgs, connectionFromArray } from "graphql-relay";

import CompendiumsConnection from "./CompendiumsConnection";
import Compendium_getListOrCreate from "../helper/Compendium_getListOrCreate";


export default {
  compendiums: {
    type: CompendiumsConnection.connectionType,
    args: { ...connectionArgs },
    resolve: ( obj, { ...args }, { rootValue: {user_id, objectManager} } ) => Compendium_getListOrCreate( user_id, objectManager ).then( ( arr ) => connectionFromArray( arr, args ) )
  },
}
