/* @flow weak */

import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLInt, GraphQLID, GraphQLNonNull } from "graphql";

import GraphQLDateTime from "../scalar/GraphQLDateTime";

import { DA_User_get } from '../../data/da/User';

import TranslaticiarumType from '../type/TranslaticiarumType';

export default mutationWithClientMutationId( {
  name: 'Translaticiarum_update',
  inputFields: {
    id:                   { type: new GraphQLNonNull( GraphQLID ) },
    Translaticiarum_Type: { type: new GraphQLNonNull( GraphQLInt ) },
    Translaticiarum_Date: { type: new GraphQLNonNull( GraphQLDateTime ) },
    Translaticiarum_Time: { type: new GraphQLNonNull( GraphQLDateTime ) },
  },
  outputFields: {
    Translaticiarum: {
      type: TranslaticiarumType,
      resolve: ( {local_id}, { ...args }, { rootValue: {user_id, objectManager} } ) => objectManager.getOneById( 'Translaticiarum', local_id ),
    }
  },
  mutateAndGetPayload: ( {id, Translaticiarum_Type, Translaticiarum_Date, Translaticiarum_Time }, { rootValue: {objectManager} } ) => {
    var local_id = fromGlobalId(id).id;
    return objectManager.update( 'Translaticiarum', {
      id: local_id,
      Translaticiarum_Type,
      Translaticiarum_Date,
      Translaticiarum_Time,
    } )
    .then( ( ) => ( {local_id} ) )
    ;
  },
} );
