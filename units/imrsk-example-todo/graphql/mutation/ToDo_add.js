/* @flow weak */

import chalk from 'chalk';

import { fromGlobalId, mutationWithClientMutationId, cursorForObjectInConnection } from "graphql-relay";
import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import { cursorForObjectInConnectionWithUuidComparison } from '../../../../graphql/helper/mutation_helper';

import ToDosConnection from '../type/ToDosConnection';
import ViewerType from '../../../../graphql/type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'ToDo_add',
  inputFields: {
    ToDo_Text: { type: new GraphQLNonNull( GraphQLString ) }
  },
  outputFields: {
    ToDosEdge: {
      type: ToDosConnection.edgeType,
      resolve: ( {local_id}, args, { rootValue: {user_id, objectManager} } ) =>
      {
        let an_Object;
        return objectManager.getOneById( 'ToDo', local_id )
        .then( ( retrieved_Object ) => {
          an_Object = retrieved_Object;
        } )
        .then( ( ) => objectManager.getListBy( 'ToDo', 'ToDo_User_id', user_id.toString( ) ) )
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
  mutateAndGetPayload: ( {ToDo_Text}, { rootValue: {user_id, objectManager} } ) =>
    objectManager.add( 'ToDo', {
      ToDo_User_id: user_id,
      ToDo_Text,
      ToDo_Complete: false
    } )
    .then( ( local_id ) => ( {local_id} ) )
} );
