/* @flow weak */

import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

import Viewer_updatePasswordMutation from '../mutations/Viewer_updatePasswordMutation';


class User_Properties extends React.Component
{
  _handleUpdate = ( ) =>
  {
    Relay.Store.commitUpdate(
      new Viewer_updatePasswordMutation( {
        Viewer:             this.props.Viewer,
        User_Password:      this.refs.User_Password.getValue( ),
      } )
    );
  };

  render( )
  {
    if( this.props.Viewer.User_IsAnonymous )
      return <div/>; // Anonymous users do not get to have a profile
    else
      return (
        <Card>
          <CardHeader
            title="User password"
          />
          <CardText>
            <TextField
              ref="User_Password"
              type="password"
              defaultValue={ this.props.Viewer.User_Password }
              floatingLabelText="Password"
              fullWidth={ true }
            />
            <div>
              <RaisedButton
                label="Update"
                secondary={true}
                onTouchTap={ ( ) => this._handleUpdate( ) }
              />
            </div>
          </CardText>
        </Card>
      );
  }
}

export default Relay.createContainer( User_Properties, {
  fragments: {
    Viewer: ( ) => Relay.QL`
      fragment on Viewer{
        User_IsAnonymous,
        ${Viewer_updatePasswordMutation.getFragment('Viewer')},
      }
    `,
  }
} );
