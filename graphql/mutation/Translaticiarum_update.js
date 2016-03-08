/* @flow weak */

import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLInt, GraphQLID, GraphQLNonNull } from "graphql";

import GraphQLDateTime from "../scalar/GraphQLDateTime";

import { DA_User_get } from '../../data/da/User';
import { DA_Translaticiarum_get, DA_Translaticiarum_update } from '../../data/da/Translaticiarum';

import TranslaticiarumType from '../type/TranslaticiarumType';

export default mutationWithClientMutationId( {
  name: 'Translaticiarum_update',
  inputFields: {
    id: { type: new GraphQLNonNull( GraphQLID ) },
    Translaticiarum_Type: { type: new GraphQLNonNull( GraphQLInt ) },
    Translaticiarum_Date: { type: new GraphQLNonNull( GraphQLDateTime ) },
    Translaticiarum_Time: { type: new GraphQLNonNull( GraphQLDateTime ) },
  },
  outputFields: {
    Translaticiarum: {
      type: TranslaticiarumType,
      resolve: ( {localTranslaticiarumId}, { ...args }, { rootValue: {user_id} } ) => DA_Translaticiarum_get( user_id, localTranslaticiarumId ),
    }
  },
  mutateAndGetPayload: ( {id, Translaticiarum_Type, Translaticiarum_Date, Translaticiarum_Time }, { rootValue: {user_id} } ) => {
    var localTranslaticiarumId = fromGlobalId(id).id;
    return DA_Translaticiarum_update( user_id, localTranslaticiarumId, {
      Translaticiarum_Type: Translaticiarum_Type,
      Translaticiarum_Date: Translaticiarum_Date,
      Translaticiarum_Time: Translaticiarum_Time,
    } )
    .then( ( ) => ( {localTranslaticiarumId} ) )
    ;
  },
} );
