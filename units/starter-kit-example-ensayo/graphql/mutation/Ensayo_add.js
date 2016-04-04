/* @flow weak */

import { fromGlobalId, mutationWithClientMutationId, cursorForObjectInConnection } from "graphql-relay";
import { GraphQLString, GraphQLNonNull } from "graphql";

import { cursorForObjectInConnectionWithUuidComparison } from '../../../../graphql/helper/mutation_helper';

import EnsayosConnection from '../type/EnsayosConnection';
import ViewerType from '../../../../graphql/type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'Ensayo_add',
  inputFields: {
    Ensayo_Content:     { type: new GraphQLNonNull( GraphQLString ) },
    Ensayo_Title:       { type: new GraphQLNonNull( GraphQLString ) },
    Ensayo_Description: { type: new GraphQLNonNull( GraphQLString ) },
  },
  outputFields: {
    EnsayosEdge: {
      type: EnsayosConnection.edgeType,
      resolve: ( {local_id}, args, { rootValue: {user_id, objectManager} } ) =>
      {
        let an_Object;
        return objectManager.getOneById( 'Ensayo', local_id )
        .then( ( retrieved_Object ) => {
          an_Object = retrieved_Object;
        } )
        .then( ( ) => objectManager.getListBy( 'Ensayo', 'Ensayo_User_id', user_id.toString( ) ) )
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
  mutateAndGetPayload: ( { Ensayo_Content, Ensayo_Title, Ensayo_Description }, { rootValue: {user_id, objectManager} } ) =>
    objectManager.add( 'Ensayo', {
      Ensayo_User_id: user_id,
      Ensayo_Content,
      Ensayo_Title,
      Ensayo_Description,
    } )
    .then( ( local_id ) => ( {local_id} ) )
} );
