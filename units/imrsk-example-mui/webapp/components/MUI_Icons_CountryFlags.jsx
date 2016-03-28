/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import ListItem from 'material-ui/lib/lists/list-item';

import {
  Icon_Flag_BG,
  Icon_Flag_DE,
  Icon_Flag_FR,
  Icon_Flag_IN,
  Icon_Flag_US
} from 'material-ui-country-flags';

class MUI_Icons_CountryFlags extends React.Component
{
  render( )
  {
    return (
      <div>
        <Card>
          <List>
            <ListItem key="0" primaryText="Icon_Flag_BG" leftIcon={<Icon_Flag_BG />} />
            <Divider inset={true} />
            <ListItem key="1" primaryText="Icon_Flag_DE" leftIcon={<Icon_Flag_DE />} />
            <Divider inset={true} />
            <ListItem key="2" primaryText="Icon_Flag_FR" leftIcon={<Icon_Flag_FR />} />
            <Divider inset={true} />
            <ListItem key="3" primaryText="Icon_Flag_IN" leftIcon={<Icon_Flag_IN />} />
            <Divider inset={true} />
            <ListItem key="4" primaryText="Icon_Flag_US" leftIcon={<Icon_Flag_US />} />
          </List>
        </Card>
      </div>
    )
  }
}

export default Relay.createContainer( MUI_Icons_CountryFlags, {
  fragments: {
    Viewer: ( ) => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
      }
    `,
  },
} );
