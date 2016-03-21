/* @flow weak */

import React from 'react';
import { createRoutes, IndexRoute, Route } from 'react-router';
import Relay from 'react-relay';

import Chrome from './components/Chrome.jsx';
import Compendium from '../units/imrsk-example-compendium/webapp/components/Compendium.jsx';
import Ensayo_List from '../units/imrsk-example-ensayo/webapp/components/Ensayo_List.jsx';
import Ensayo_Screen from '../units/imrsk-example-ensayo/webapp/components/Ensayo_Screen.jsx';
import Ensayo_PublicItem from '../units/imrsk-example-ensayo/webapp/components/Ensayo_PublicItem.jsx';
import Ensayo_PublicListing from '../units/imrsk-example-ensayo/webapp/components/Ensayo_PublicListing.jsx';
import Home_Screen from './components/Home_Screen.jsx';
import MUI_Icons from '../units/imrsk-example-mui/webapp/components/MUI_Icons.jsx';
import MUI_Home from '../units/imrsk-example-mui/webapp/components/MUI_Home.jsx';
import ToDo_List from '../units/imrsk-example-todo/webapp/components/ToDo_List.jsx';
import ToDo_Screen from '../units/imrsk-example-todo/webapp/components/ToDo_Screen.jsx';
import Translaticiarum_List from '../units/imrsk-example-translaticiarum/webapp/components/Translaticiarum_List.jsx';
import Translaticiarum_Grid from '../units/imrsk-example-translaticiarum/webapp/components/Translaticiarum_Grid.jsx';
import Translaticiarum_Screen from '../units/imrsk-example-translaticiarum/webapp/components/Translaticiarum_Screen.jsx';
import User_Properties from '../units/user-management/webapp/components/User_Properties.jsx';
import User_UpdatePassword from '../units/user-management/webapp/components/User_UpdatePassword.jsx';


const queries = {
  Viewer: () => Relay.QL`query { Viewer }`,
};

export default createRoutes(
  <Route path="/" component={Chrome} queries={queries}>
    <IndexRoute component={Home_Screen} queries={queries} />
    <Route path="Compendiums">
      <IndexRoute component={Compendium} queries={queries} />
    </Route>
    <Route path="Ensayos" component={Ensayo_Screen} queries={queries}>
      <IndexRoute component={Ensayo_List} queries={queries} />
    </Route>
    <Route path="Ensayo_PublicListing">
      <IndexRoute component={Ensayo_PublicListing} queries={queries} />
      <Route path=":id" component={Ensayo_PublicItem} queries={queries} />
    </Route>
    <Route path="mui">
      <IndexRoute component={MUI_Home} queries={queries} />
      <Route path="icons" component={MUI_Icons} queries={queries} />
    </Route>
    <Route path="Translaticiarums" component={Translaticiarum_Screen} queries={queries}>
      <IndexRoute component={Translaticiarum_List} queries={queries} />
    </Route>
    <Route path="TranslaticiarumsGrid" component={Translaticiarum_Grid} queries={queries}/>
    <Route path="User">
      <IndexRoute component={User_Properties} queries={queries} />
      <Route path="UpdatePassword" component={User_UpdatePassword} queries={queries} />
    </Route>
    <Route path="ToDos" component={ToDo_Screen} queries={queries}>
      <IndexRoute component={ToDo_List} queries={queries} prepareParams={ () => ({status: 'any'}) }/>
      <Route path=":status" component={ToDo_List} queries={queries} />
    </Route>
  </Route>
);
