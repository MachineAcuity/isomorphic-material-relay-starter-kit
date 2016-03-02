/* @flow weak */

import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import { DA_User_get } from '../../data/da/User';
import { DA_Ensayo_get, DA_Ensayo_update } from '../../data/da/Ensayo';

import EnsayoType from '../type/EnsayoType';

export default mutationWithClientMutationId( {
  name: 'Ensayo_update',
  inputFields: {
    id: { type: new GraphQLNonNull( GraphQLID ) },
    Ensayo_Content: { type: new GraphQLNonNull( GraphQLString ) },
    Ensayo_Title: { type: new GraphQLNonNull( GraphQLString ) },
    Ensayo_Description: { type: new GraphQLNonNull( GraphQLString ) },
  },
  outputFields: {
    Ensayo: {
      type: EnsayoType,
      resolve: ( {localEnsayoId}, { ...args }, { rootValue: {user_id} } ) => DA_Ensayo_get( user_id, localEnsayoId ),
    }
  },
  mutateAndGetPayload: ( {id, Ensayo_Content, Ensayo_Title, Ensayo_Description }, { rootValue: {user_id} } ) => {
    var localEnsayoId = fromGlobalId(id).id;
    return DA_Ensayo_update( user_id, localEnsayoId, {
      Ensayo_Content: Ensayo_Content,
      Ensayo_Title: Ensayo_Title,
      Ensayo_Description: Ensayo_Description,
    } )
    .then( ( ) => ( {localEnsayoId} ) )
    ;
  },
} );
