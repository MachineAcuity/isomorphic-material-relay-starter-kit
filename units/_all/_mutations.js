/* @flow */

import Compendium_mutations from "../imrsk-example-compendium/graphql/mutation/_mutations";
import Ensayo_mutations from "../imrsk-example-ensayo/graphql/mutation/_mutations";
import ToDo_mutations from "../imrsk-example-todo/graphql/mutation/_mutations";
import Translaticiarum_mutations from "../imrsk-example-translaticiarum/graphql/mutation/_mutations";


export default {
  ...Compendium_mutations,
  ...Ensayo_mutations,
  ...ToDo_mutations,
  ...Translaticiarum_mutations,
}
