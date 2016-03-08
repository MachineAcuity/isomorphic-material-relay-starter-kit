/* @flow weak */

import { globalIdField } from "graphql-relay";
import { GraphQLBoolean, GraphQLString, GraphQLObjectType } from "graphql";

import NodeInterface from "../interface/NodeInterface";

import ToDo from '../../data/model/ToDo';

export default new GraphQLObjectType( {
  name: 'ToDo',
  interfaces: [NodeInterface],
  isTypeOf: object => object instanceof ToDo,
  fields: {
    id: globalIdField('ToDo'),
    ToDo_Text: { type: GraphQLString, resolve: (obj) => obj.ToDo_Text },
    ToDo_Complete: { type: GraphQLBoolean, resolve: (obj) => obj.ToDo_Complete },
  },
} );
