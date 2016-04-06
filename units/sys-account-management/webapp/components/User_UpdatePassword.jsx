/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import LinearProgress from 'material-ui/lib/linear-progress';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

import { RequiresAuthenticationNotice } from './RequiresAuthentication.js';
import scorePassword from '../../scripts/scorePassword';

import Viewer_updatePasswordMutation from '../mutations/Viewer_updatePasswordMutation';


class User_Properties extends React.Component
{
  constructor( props )
  {
    super( props );

    this.state = {
      User_AccountPassword_Old: "",
      User_AccountPassword: "",
      User_AccountPasswordError: "Enter password",
      User_AccountPasswordConfirmation: "",
      User_AccountPasswordConfirmationError: "Confirm password",
      User_AccountPasswordStrength: 0,
    };
  }

  _handle_onChange_User_AccountPassword = ( event ) =>
  {
    const passwordScore = scorePassword( event.target.value );

    this.setState( {
      User_AccountPassword: event.target.value,
      User_AccountPasswordStrength: passwordScore,
    } );

    this.checkIfPasswordsMatch( event.target.value, this.state.User_AccountPasswordConfirmation );
  };

  _handle_onChange_User_AccountPasswordConfirmation = ( event ) =>
  {
    this.setState( { User_AccountPasswordConfirmation: event.target.value } );

    this.checkIfPasswordsMatch( this.state.User_AccountPassword, event.target.value );
  };

  checkIfPasswordsMatch( password, passwordConfirmation)
  {
    this.setState( { User_AccountPasswordError:
      password == "" ?
        "Password can not be empty"
        : ""
    } );

    this.setState( { User_AccountPasswordConfirmationError:
      password != passwordConfirmation ?
        "Passwords do not match"
        : ""
    } );
  }

  _handleUpdate = ( ) =>
  {
    Relay.Store.commitUpdate(
      new Viewer_updatePasswordMutation( {
        Viewer:               this.props.Viewer,
        User_AccountPassword: this.refs.User_AccountPassword.getValue( ),
      } )
    );
  };

  render( )
  {
    if( this.props.Viewer.User_IsAnonymous )
      return <RequiresAuthenticationNotice />; // Anonymous users do not get to have a password
    else
      return (
        <Card>
          <CardHeader
            title="User password"
          />
          <CardText>
            <TextField
              ref="User_AccountPassword"
              type="password"
              floatingLabelText="Password"
              value={ this.state.User_AccountPassword }
              errorText={ this.state.User_AccountPasswordError }
              onChange={ this._handle_onChange_User_AccountPassword }
              fullWidth={ true }
            />
            <TextField
              ref="User_AccountPasswordConfirmation"
              type="password"
              floatingLabelText="Confirm Password"
              value={ this.state.User_AccountPasswordConfirmation }
              errorText={ this.state.User_AccountPasswordConfirmationError }
              onChange={ this._handle_onChange_User_AccountPasswordConfirmation }
              fullWidth={ true }
            />
            <br/><br/>Password strength
            <LinearProgress
              mode="determinate"
              value={ this.state.User_AccountPasswordStrength }
              color={ this.state.User_AccountPasswordStrength < 60 ? "#ff0000" : ( this.state.User_AccountPasswordStrength < 80 ? "#c0c000" : "#00d000" ) }
            />
            <br/>
            <div>
              <RaisedButton
                label="Update"
                secondary={true}
                disabled={ this.state.User_AccountPasswordError != "" || this.state.User_AccountPasswordConfirmationError != "" }
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
