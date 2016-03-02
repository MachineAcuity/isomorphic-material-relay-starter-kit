/* @flow weak */

import chalk from 'chalk';

import { fromGlobalId, mutationWithClientMutationId, cursorForObjectInConnection } from "graphql-relay";
import { GraphQLString, GraphQLNonNull } from "graphql";

import GraphQLDateTime from "../scalar/GraphQLDateTime";

import { cursorForObjectInConnectionWithUuidComparison } from '../helper/mutation_helper';
import { DA_User_get } from '../../data/da/User';
import { DA_Ensayo_add, DA_Ensayo_get, DA_Ensayo_list_get } from '../../data/da/Ensayo';

import EnsayosConnection from '../type/EnsayosConnection';
import ViewerType from '../type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'Ensayo_add',
  inputFields: {
    Ensayo_Content: { type: new GraphQLNonNull( GraphQLString ) },
    Ensayo_Title: { type: new GraphQLNonNull( GraphQLString ) },
    Ensayo_Description: { type: new GraphQLNonNull( GraphQLString ) },
  },
  outputFields: {
    EnsayosEdge: {
      type: EnsayosConnection.edgeType,
      resolve: ( {localEnsayoId}, args, { rootValue: {user_id} } ) =>
      {
        let a_Ensayo;
        return DA_Ensayo_get( user_id, localEnsayoId )
        .then( ( retrieved_Ensayo ) => {
          a_Ensayo = retrieved_Ensayo;
        } )
        .then( ( ) => DA_Ensayo_list_get( user_id ) )
        .then( ( arr_Ensayo ) => ( {
          cursor: cursorForObjectInConnectionWithUuidComparison( arr_Ensayo, a_Ensayo ),
          node: a_Ensayo,
        } ) )
        ;
      }
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DA_User_get( user_id )
    },
  },
  mutateAndGetPayload: ( { Ensayo_Content, Ensayo_Title, Ensayo_Description }, { rootValue: {user_id} } ) =>
    DA_Ensayo_add( user_id, {
      Ensayo_User_id: user_id,
      Ensayo_Content: Ensayo_Content,
      Ensayo_Title: Ensayo_Title,
      Ensayo_Description: Ensayo_Description,
    } )
    .then( ( localEnsayoId ) => ( {localEnsayoId} ) )
} );
