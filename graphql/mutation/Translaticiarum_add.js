/* @flow weak */

import chalk from 'chalk';

import { fromGlobalId, mutationWithClientMutationId, cursorForObjectInConnection } from "graphql-relay";
import { GraphQLInt, GraphQLID, GraphQLNonNull } from "graphql";

import GraphQLDateTime from "../scalar/GraphQLDateTime";

import { cursorForObjectInConnectionWithUuidComparison } from '../helper/mutation_helper';
import { DA_User_get } from '../../data/da/User';
import { DA_Translaticiarum_add, DA_Translaticiarum_get, DA_Translaticiarum_list_get } from '../../data/da/Translaticiarum';

import TranslaticiarumsConnection from '../type/TranslaticiarumsConnection';
import ViewerType from '../type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'Translaticiarum_add',
  inputFields: {
    Translaticiarum_Type: { type: new GraphQLNonNull( GraphQLInt ) },
    Translaticiarum_Date: { type: new GraphQLNonNull( GraphQLDateTime ) },
    Translaticiarum_Time: { type: new GraphQLNonNull( GraphQLDateTime ) },
  },
  outputFields: {
    TranslaticiarumsEdge: {
      type: TranslaticiarumsConnection.edgeType,
      resolve: ( {localTranslaticiarumId}, args, { rootValue: {user_id} } ) =>
      {
        let a_Translaticiarum;
        return DA_Translaticiarum_get( user_id, localTranslaticiarumId )
        .then( ( retrieved_Translaticiarum ) => {
          a_Translaticiarum = retrieved_Translaticiarum;
        } )
        .then( ( ) => DA_Translaticiarum_list_get( user_id ) )
        .then( ( arr_Translaticiarum ) => ( {
          cursor: cursorForObjectInConnectionWithUuidComparison( arr_Translaticiarum, a_Translaticiarum ),
          node: a_Translaticiarum,
        } ) )
        ;
      }
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DA_User_get( user_id )
    },
  },
  mutateAndGetPayload: ( { Translaticiarum_Type, Translaticiarum_Date, Translaticiarum_Time }, { rootValue: {user_id} } ) =>
    DA_Translaticiarum_add( user_id, {
      Translaticiarum_User_id: user_id,
      Translaticiarum_Type: Translaticiarum_Type,
      Translaticiarum_Date: Translaticiarum_Date,
      Translaticiarum_Time: Translaticiarum_Time,
    } )
    .then( ( localTranslaticiarumId ) => ( {localTranslaticiarumId} ) )
} );
