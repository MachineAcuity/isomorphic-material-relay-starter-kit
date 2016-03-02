/* @flow weak */

import { fromGlobalId } from "graphql-relay";
import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from "graphql";

import ViewerType from "./ViewerType";
import NodeInterface from "../interface/NodeInterface";

import { DA_User_get } from '../../data/da/User';
import { DA_Compendium_get } from '../../data/da/Compendium';
import { DA_Ensayo_get } from '../../data/da/Ensayo';
import { DA_ToDo_get } from '../../data/da/ToDo';
import { DA_Translaticiarum_get } from '../../data/da/Translaticiarum';

function resolveNodeField( source, args, { rootValue: {user_id} } )
{
  // the node field will receive a globally
  // unique id, and here we convert that back
  // to the local type and id
  const {id, type} = fromGlobalId(args.id);

  // map the local type and id into the
  // actual data for the record
  switch( type )
  {
    case "Viewer":             return DA_User_get( id );

    case "Compendium":         return DA_Compendium_get( user_id, id );
    case "Ensayo":             return DA_Ensayo_get( user_id, id );
    case "ToDo":               return DA_ToDo_get( user_id, id );
    case "Translaticiarum":    return DA_Translaticiarum_get( user_id, id );
  }
};

export default new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    node: {
      type: NodeInterface,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: resolveNodeField
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DA_User_get( user_id )
    },
  })
});
