/* @flow weak */

import { GraphQLID, GraphQLBoolean, GraphQLInt, GraphQLString, GraphQLObjectType } from "graphql";
import { globalIdField, fromGlobalId, connectionArgs, connectionFromArray } from "graphql-relay";

import Compendium_ViewerFields from "../../units/imrsk-example-compendium/graphql/type/Compendium_ViewerFields";
import Ensayo_ViewerFields from "../../units/imrsk-example-ensayo/graphql/type/Ensayo_ViewerFields";
import NodeInterface from "../interface/NodeInterface";
import ToDosConnection from "../../units/imrsk-example-todo/graphql/type/ToDosConnection";
import ToDo_ViewerFields from "../../units/imrsk-example-todo/graphql/type/ToDo_ViewerFields";
import Translaticiarum_ViewerFields from "../../units/imrsk-example-translaticiarum/graphql/type/Translaticiarum_ViewerFields";
import User from '../../data/model/User';
import { Uuid } from '../../data/lib/CassandraClient.js';


const Uuid_0 = Uuid.fromString( '00000000-0000-0000-0000-000000000000' );


export default new GraphQLObjectType( {
  name: 'Viewer',
  interfaces: [NodeInterface],
  isTypeOf: object => object instanceof User,
  fields: {
    id: globalIdField('Viewer'),

    // ->->-> User properties

    User_IsAnonymous:  { type: GraphQLBoolean, resolve: (obj) => obj.id.equals( Uuid_0 ) },
    User_DisplayName:  { type: GraphQLString,  resolve: (obj) => obj.User_DisplayName },
    User_ProfilePhoto: { type: GraphQLString,  resolve: (obj) => obj.User_ProfilePhoto },
    User_Email:        { type: GraphQLString,  resolve: (obj) => obj.User_Email },
    User_Locale:       { type: GraphQLString,  resolve: (obj) => obj.User_Locale },
    User_AuthToken:    { type: GraphQLString,  resolve: (obj) => obj.User_AuthToken },

    // <-<-<- User properties

    ...Compendium_ViewerFields,
    ...Ensayo_ViewerFields,
    ...ToDo_ViewerFields,
    ...Translaticiarum_ViewerFields,
  },
} );
