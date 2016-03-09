/* @flow weak */

import { fromGlobalId } from "graphql-relay";
import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from "graphql";

import ViewerType from "./ViewerType";
import NodeInterface from "../interface/NodeInterface";

import { DA_ToDo_get } from '../../data/da/ToDo';

function resolveNodeField( source, args, { rootValue: {user_id, objectManager} } )
{
  // the node field will receive a globally
  // unique id, and here we convert that back
  // to the local type and id
  const {local_id, type} = fromGlobalId(args.id);

  // map the local type and id into the
  // actual data for the record
  switch( type )
  {
    case "Viewer":             return objectManager.getOneById( 'User', local_id );

    //case "Compendium":         return objectManager.getOneById( 'Compendium', local_id );
    //case "Ensayo":             return objectManager.getOneById( 'Ensayo', local_id );
    case "ToDo":               return DA_ToDo_get( user_id, local_id );
    //case "Translaticiarum":    return objectManager.getOneById( 'Translaticiarum', local_id );
    default:                   return objectManager.getOneById( type, local_id );
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
      resolve: ( parent, args, { rootValue: {user_id, objectManager} } ) => objectManager.getOneById( 'User', user_id )
    },
  })
});
