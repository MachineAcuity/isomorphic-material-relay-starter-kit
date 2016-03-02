/* @flow weak */

import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLID, GraphQLNonNull } from "graphql";

import { DA_User_get } from '../../data/da/User';
import { DA_Ensayo_delete } from '../../data/da/Ensayo';

import ViewerType from '../type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'Ensayo_delete',
  inputFields: {
    id: { type: new GraphQLNonNull( GraphQLID ) },
  },
  outputFields: {
    deletedEnsayoId: {
      type: GraphQLID,
      resolve: ( {id} ) => id,
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, { rootValue: {user_id} } ) => DA_User_get( user_id )
    },
  },
  mutateAndGetPayload: ( {id}, { rootValue: {user_id} } ) =>
  {
    var localEnsayoId = fromGlobalId(id).id;
    return DA_Ensayo_delete( user_id, localEnsayoId )
    .then( ( ) => ( {id} ) )
    ;
  }
} );
