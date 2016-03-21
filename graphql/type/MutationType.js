/* @flow weak */

import {GraphQLObjectType} from "graphql";

import _mutations from "../../units/_all/_mutations";


export default new GraphQLObjectType( {
  name: 'Mutation',
  fields: {

    ..._mutations,

  },
} );
