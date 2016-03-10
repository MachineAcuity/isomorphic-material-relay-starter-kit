/* @flow weak */

import { fromGlobalId } from "graphql-relay";
import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from "graphql";

import ViewerType from "./ViewerType";
import NodeInterface from "../interface/NodeInterface";

function resolveNodeField( source, args, { rootValue: {user_id, objectManager} } )
{
  // the node field will receive a globally
  // unique id, and here we convert that back
  // to the local type and id
  const {local_id, type} = fromGlobalId(args.id);

  // map the local type and id into the
  // actual data for the record
  if( type === 'Viewer' )
    return objectManager.getOneById( 'User', local_id );
  else
    return objectManager.getOneById( type, local_id );
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
