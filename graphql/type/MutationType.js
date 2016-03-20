/* @flow weak */

import {GraphQLObjectType} from "graphql";

import All_mutations from "../../units/_all/_mutations";

//import Compendium_mutations from "../../units/imrsk-example-compendium/graphql/mutation/_mutations";
// import Ensayo_mutations from "../../units/imrsk-example-ensayo/graphql/mutation/_mutations";
// import ToDo_mutations from "../../units/imrsk-example-todo/graphql/mutation/_mutations";
// import Translaticiarum_mutations from "../../units/imrsk-example-translaticiarum/graphql/mutation/_mutations";


import Viewer_update from "../mutation/Viewer_update";
import Viewer_updatePassword from "../mutation/Viewer_updatePassword";


export default new GraphQLObjectType( {
  name: 'Mutation',
  fields: {

    ...All_mutations,
    // ...Ensayo_mutations,
    // ...ToDo_mutations,
    // ...Translaticiarum_mutations,


    Viewer_update: Viewer_update,
    Viewer_updatePassword: Viewer_updatePassword,

  },
} );
