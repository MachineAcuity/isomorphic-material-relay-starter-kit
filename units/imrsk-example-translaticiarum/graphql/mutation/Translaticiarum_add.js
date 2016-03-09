/* @flow weak */

import chalk from 'chalk';

import { fromGlobalId, mutationWithClientMutationId, cursorForObjectInConnection } from "graphql-relay";
import { GraphQLInt, GraphQLID, GraphQLNonNull } from "graphql";

import GraphQLDateTime from "../../../../graphql/scalar/GraphQLDateTime";

import { cursorForObjectInConnectionWithUuidComparison } from '../../../../graphql/helper/mutation_helper';

import TranslaticiarumsConnection from '../type/TranslaticiarumsConnection';
import ViewerType from '../../../../graphql/type/ViewerType';


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
      resolve: ( {local_id}, args, { rootValue: {user_id, objectManager} } ) =>
      {
        let an_Object;
        return objectManager.getOneById( 'Translaticiarum', local_id )
        .then( ( retrieved_Object ) => {
          an_Object = retrieved_Object;
        } )
        .then( ( ) => objectManager.getListBy( 'Translaticiarum', 'Translaticiarum_User_id', user_id.toString( ) ) )
        .then( ( arr ) => ( {
          cursor: cursorForObjectInConnectionWithUuidComparison( arr, an_Object ),
          node: an_Object,
        } ) )
        ;
      }
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, { rootValue: {user_id, objectManager} } ) => objectManager.getOneById( 'User', user_id )
    },
  },
  mutateAndGetPayload: ( { Translaticiarum_Type, Translaticiarum_Date, Translaticiarum_Time }, { rootValue: {user_id, objectManager} } ) =>
    objectManager.add( 'Translaticiarum', {
      Translaticiarum_User_id: user_id,
      Translaticiarum_Type,
      Translaticiarum_Date,
      Translaticiarum_Time,
    } )
    .then( ( local_id ) => ( {local_id} ) )
} );
