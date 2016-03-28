/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import ListItem from 'material-ui/lib/lists/list-item';

import {
  Icon_AmericanExpress,
  Icon_CreditCardOutline,
  Icon_DinersClub,
  Icon_Discover,
  Icon_JCB,
  Icon_MasterCard,
  Icon_Visa
} from 'material-ui-credit-card-icons';

class MUI_Icons_CreditCards extends React.Component
{
  render( )
  {
    return (
      <div>
        <Card>
          <List>
            <ListItem key="0" primaryText="Icon_AmericanExpress" leftIcon={<Icon_AmericanExpress />} />
            <Divider inset={true} />
            <ListItem key="1" primaryText="Icon_CreditCardOutline" leftIcon={<Icon_CreditCardOutline />} />
            <Divider inset={true} />
            <ListItem key="2" primaryText="Icon_DinersClub" leftIcon={<Icon_DinersClub />} />
            <Divider inset={true} />
            <ListItem key="3" primaryText="Icon_Discover" leftIcon={<Icon_Discover />} />
            <Divider inset={true} />
            <ListItem key="4" primaryText="Icon_JCB" leftIcon={<Icon_JCB />} />
            <Divider inset={true} />
            <ListItem key="5" primaryText="Icon_MasterCard" leftIcon={<Icon_MasterCard />} />
            <Divider inset={true} />
            <ListItem key="6" primaryText="Icon_Visa" leftIcon={<Icon_Visa />} />
          </List>
        </Card>
      </div>
    )
  }
}

export default Relay.createContainer( MUI_Icons_CreditCards, {
  fragments: {
    Viewer: ( ) => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
      }
    `,
  },
} );
