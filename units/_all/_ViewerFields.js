/* @flow */

import Compendium_ViewerFields from "../imrsk-example-compendium/graphql/type/Compendium_ViewerFields";
import Ensayo_ViewerFields from "../imrsk-example-ensayo/graphql/type/Ensayo_ViewerFields";
import ToDo_ViewerFields from "../imrsk-example-todo/graphql/type/ToDo_ViewerFields";
import Translaticiarum_ViewerFields from "../imrsk-example-translaticiarum/graphql/type/Translaticiarum_ViewerFields";


export default {
  ...Compendium_ViewerFields,
  ...Ensayo_ViewerFields,
  ...ToDo_ViewerFields,
  ...Translaticiarum_ViewerFields,
}
