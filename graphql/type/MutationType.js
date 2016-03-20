/* @flow weak */

import {GraphQLObjectType} from "graphql";

import _mutations from "../../units/_all/_mutations";
import Viewer_update from "../mutation/Viewer_update";
import Viewer_updatePassword from "../mutation/Viewer_updatePassword";


export default new GraphQLObjectType( {
  name: 'Mutation',
  fields: {

    ..._mutations,

    Viewer_update: Viewer_update,
    Viewer_updatePassword: Viewer_updatePassword,

  },
} );
