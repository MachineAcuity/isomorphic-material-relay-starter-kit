/* @flow weak */

import React from 'react';
import Relay from 'react-relay';

import Avatar from 'material-ui/lib/avatar';
import Dialog from 'material-ui/lib/dialog';
import Divider from 'material-ui/lib/divider';
import FlatButton from 'material-ui/lib/flat-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import IconSocialPerson from 'material-ui/lib/svg-icons/social/person';
import IconSocialPersonOutline from 'material-ui/lib/svg-icons/social/person-outline';
import LinearProgress from 'material-ui/lib/linear-progress';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Popover from 'material-ui/lib/popover/popover';
import TextField from 'material-ui/lib/text-field';

import { postXHR } from '../scripts/XHR';

const styles = {
  popover: {
    padding: 10,
  },
};


class AppBar_Auth extends React.Component
{
  constructor( props )
  {
    super( props );

    this.state = {
      Dialog_AuthenticationChallenge_IsOpen: false,
      Dialog_AuthenticationInProgress_IsOpen: false,
      Dialog_AuthenticationFailed_IsOpen: false,
      Dialog_CreateUser_IsOpen : false,
      Dialog_CreateUserInProgress_IsOpen: false,
      Dialog_CreateUserFailed_IsOpen: false,
      Dialog_LogOutConfirmation_IsOpen : false,
      Dialog_LogOutInProgress_IsOpen: false,
      Dialog_LogOutFailed_IsOpen: false,
      Popover_AuthorizedUser_IsOpen : false,
    };
  }



  //

  _handle_Authentication_Response_Success( response )
  {
    try{
      let responseJSON = JSON.parse( response );
      if( responseJSON.success != true ) throw new Error( "Login failed" );
    } catch( err ) { this._handle_Authentication_Response_Failure( "1" ); return; }

    location.replace( location.href );
  }

  _handle_Authentication_Response_Failure( response : string )
  {
    let message;
    try{
      let responseJSON = JSON.parse( response );
      message = responseJSON.error;
    } catch( err ) { message = "Improper server response"; }

    this.setState( {
      Dialog_AuthenticationInProgress_IsOpen: false,
      Dialog_AuthenticationFailed_IsOpen: true,
      Dialog_AuthenticationFailed_Message: message,
    } );
  }



  //

  _handle_CreateUser_Response_Success( response )
  {
    try{
      let responseJSON = JSON.parse( response );
      if( responseJSON.success != true ) throw new Error( "New User Creation failed" );
    } catch( err ) { this._handle_CreateUser_Response_Failure( "1" ); return; }

    location.replace( location.href );
  }

  _handle_CreateUser_Response_Failure( response : string )
  {
    let message;
    try{
      let responseJSON = JSON.parse( response );
      message = responseJSON.error;
    } catch( err ) { message = "Improper server response"; }

    this.setState( {
      Dialog_CreateUserInProgress_IsOpen: false,
      Dialog_CreateUserFailed_IsOpen: true,
      Dialog_CreateUserFailed_Message: message,
    } );
  }



  //

  _handle_LogOutConfirmation_Response_Success( response )
  {
    try{
      let responseJSON = JSON.parse( response );
      if( responseJSON.success != true ) throw new Error( "Log Out failed" );
    } catch( err ) { this._handle_LogOutConfirmation_Response_Failure( "1" ); return; }

    location.replace( location.href );
  }

  _handle_LogOutConfirmation_Response_Failure( response )
  {
    let message;
    try{
      let responseJSON = JSON.parse( response );
      message = responseJSON.error;
    } catch( err ) { message = "Improper server response"; }

    this.setState( {
      Dialog_LogOutInProgress_IsOpen: false,
      Dialog_LogOutFailed_IsOpen: true,
      Dialog_LogOutFailed_Message: message,
    } );
  }



  //

  Dialog_AuthenticationChallenge( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_AuthenticationChallenge_IsOpen }
        title="Log In"
        actions={ [
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_AuthenticationChallenge_Cancel } />,
          <FlatButton key="CreateUser" label="Create User" secondary={true} onTouchTap={ this._handle_onTouchTap_AuthenticationChallenge_CreateUser } />,
          <FlatButton key="LogIn" label="Log In" primary={true} onTouchTap={ this._handle_onTouchTap_AuthenticationChallenge_LogIn } />,
        ] }
      >
        <TextField
          ref="username"
          floatingLabelText="E-Mail"
          fullWidth={ true }
          onEnterKeyDown={ this._handle_onEnterKeyDown_AuthenticationChallenge_UserName }
        />
        <TextField
          ref="password"
          type="password"
          floatingLabelText="Password"
          fullWidth={ true }
          onEnterKeyDown={ this._handle_onEnterKeyDown_AuthenticationChallenge_Password }
        />
      Valid user name/combinations are: jack/secret jill/birthday
      </Dialog>
    );
  }

  Dialog_AuthenticationChallenge_Open = ( ) =>
  {
    this.setState( {
      Dialog_AuthenticationChallenge_IsOpen: true
    } );
  };

  _handle_onEnterKeyDown_AuthenticationChallenge_UserName = ( ) =>
  {
    this.refs.password.focus( );
  };

  _handle_onEnterKeyDown_AuthenticationChallenge_Password = ( ) =>
  {
    this._handle_onTouchTap_AuthenticationChallenge_LogIn( );
  };

  _handle_onTouchTap_AuthenticationChallenge_LogIn = ( ) =>
  {
    this.setState( {
      Dialog_AuthenticationChallenge_IsOpen: false,
      Dialog_AuthenticationInProgress_IsOpen: true,
    } );

    var loc = window.location;
    var host = loc.protocol + "//" + loc.hostname + ":" + loc.port;

    postXHR(
      host + '/auth/login',
      {
        username: this.refs.username.getValue( ),
        password: this.refs.password.getValue( ),
      },
      ( response ) => this._handle_Authentication_Response_Success( response ),
      ( response ) => this._handle_Authentication_Response_Failure( response )
    );
  };

  _handle_onTouchTap_AuthenticationChallenge_CreateUser = ( ) =>
  {
    this.setState( {
      Dialog_AuthenticationChallenge_IsOpen: false,
      Dialog_CreateUser_IsOpen: true,
      Dialog_CreateUser_PasswordStrength: 0,
    } );
  };

  _handle_onTouchTap_AuthenticationChallenge_Cancel = ( ) =>
  {
    this.setState( {
      Dialog_AuthenticationChallenge_IsOpen: false
    } );
  };



  //

  Dialog_AuthenticationInProgress( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_AuthenticationInProgress_IsOpen }
        title="Logging In ..."
        actions={ [
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_AuthenticationInProgress_Cancel } />,
        ] }
      >
        <LinearProgress mode="indeterminate" />
      </Dialog>
    );
  }

  _handle_onTouchTap_AuthenticationInProgress_Cancel = ( ) =>
  {
    this.setState( {
      Dialog_AuthenticationInProgress_IsOpen: false
    } );
  };



  //

  Dialog_AuthenticationFailed( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_AuthenticationFailed_IsOpen }
        title="Login failed"
        actions={ [
          <FlatButton key="OK" label="OK" primary={true} onTouchTap={ this._handle_onTouchTap_LogInFailure_OK } />,
        ] }
      >
        { this.state.Dialog_AuthenticationFailed_Message }
      </Dialog>
    );
  }

  _handle_onTouchTap_LogInFailure_OK = ( ) =>
  {
    this.setState( {
      Dialog_AuthenticationFailed_IsOpen: false
    } );
  };




  //

  Dialog_CreateUser( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_CreateUser_IsOpen }
        title="Create New User"
        actions={ [
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_CreateUser_Cancel } />,
          <FlatButton key="Create" label="Create" primary={true} disabled={ this.state.Dialog_CreateUser_PasswordStrength < 60 } onTouchTap={ this._handle_onTouchTap_CreateUser_Create } />,
        ] }
      >
        <TextField
          ref="username"
          floatingLabelText="E-Mail"
          fullWidth={ true }
        />
        <TextField
          ref="password"
          type="password"
          floatingLabelText="Password"
          fullWidth={ true }
          onChange={ this._handle_onChange_CreateUser_Password }
        />
        <br/><br/>Password strength
        <LinearProgress
          mode="determinate"
          value={ this.state.Dialog_CreateUser_PasswordStrength }
          color={ this.state.Dialog_CreateUser_PasswordStrength < 60 ? "#ff0000" : ( this.state.Dialog_CreateUser_PasswordStrength < 80 ? "#c0c000" : "#00d000" ) }
        />
      </Dialog>
    );
  }

  _handle_onTouchTap_CreateUser_Create = ( ) =>
  {
    this.setState( {
      Dialog_CreateUser_IsOpen: false,
      Dialog_CreateUserInProgress_IsOpen: true,
    } );

    var loc = window.location;
    var host = loc.protocol + "//" + loc.hostname + ":" + loc.port;

    postXHR(
      host + '/auth/createuser',
      {
        username: this.refs.username.getValue( ),
        password: this.refs.password.getValue( ),
      },
      ( response ) => this._handle_CreateUser_Response_Success( response ),
      ( response ) => this._handle_CreateUser_Response_Failure( response )
    );
  };

  scorePassword( pass ) /*: number*/
  {
    let score = 0;
    if (!pass)
        return 0;

    // award every unique letter until 5 repetitions
    let letters = new Object();
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    let variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

    let variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return score;
  }

  _handle_onChange_CreateUser_Password = ( ) =>
  {
    this.setState( {
      Dialog_CreateUser_PasswordStrength: this.scorePassword( this.refs.password.getValue( ) ),
    } );
  };

  _handle_onTouchTap_CreateUser_Cancel = ( ) =>
  {
    this.setState( {
      Dialog_CreateUser_IsOpen: false
    } );
  };



  //

  Dialog_CreateUserInProgress( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_CreateUserInProgress_IsOpen }
        title="Creating user ..."
        actions={ [
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_CreateUserInProgress_Cancel } />,
        ] }
      >
        <LinearProgress mode="indeterminate" />
      </Dialog>
    );
  }

  _handle_onTouchTap_CreateUserInProgress_Cancel = ( ) =>
  {
    this.setState( {
      Dialog_CreateUserInProgress_IsOpen: false
    } );
  };




  //

  Dialog_CreateUserFailed( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_CreateUserFailed_IsOpen }
        title="Creating user failed"
        actions={ [
          <FlatButton key="OK" label="OK" primary={true} onTouchTap={ this._handle_onTouchTap_CreateUserFailed_OK } />,
        ] }
      >
        { this.state.Dialog_CreateUserFailed_Message }
      </Dialog>
    );
  }

  _handle_onTouchTap_CreateUserFailed_OK = ( ) =>
  {
    this.setState( {
      Dialog_CreateUserFailed_IsOpen: false
    } );
  };



  //

  Dialog_LogOutConfirmation( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_LogOutConfirmation_IsOpen }
        title="Log Out"
        actions={ [
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_LogOutConfirmation_Cancel } />,
          <FlatButton key="LogOut" label="Log Out" primary={true} onTouchTap={ this._handle_onTouchTap_LogOutConfirmation_LogOut } />,
        ] }
      >
      <List subheader="You are currently logged in as">
        <ListItem
          primaryText={ this.props.Viewer.User_DisplayName }
          leftAvatar={<Avatar src={ this.props.Viewer.User_ProfilePhoto } />}
        />
      </List>
      <List subheader="Are you sure you want to log out?" />
      </Dialog>
    );
  }

  _handle_onTouchTap_LogOutConfirmation_LogOut = ( ) =>
  {
    this.setState( {
      Dialog_LogOutConfirmation_IsOpen: false,
      Dialog_LogOutInProgress_IsOpen: true,
    } );

    var loc = window.location;
    var host = loc.protocol + "//" + loc.hostname + ":" + loc.port;

    postXHR(
      host + '/auth/logout',
      { },
      ( response ) => this._handle_LogOutConfirmation_Response_Success( response ),
      ( response ) => this._handle_LogOutConfirmation_Response_Failure( response )
    );
  };

  _handle_onTouchTap_LogOutConfirmation_Cancel = ( ) =>
  {
    this.setState( {
      Dialog_LogOutConfirmation_IsOpen: false
    } );
  };



  //

  Dialog_LogOutInProgress( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_LogOutInProgress_IsOpen }
        title="Logging out ..."
        actions={ [
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_LogOutInProgress_Cancel } />,
        ] }
      >
        <LinearProgress mode="indeterminate" />
      </Dialog>
    );
  }

  _handle_onTouchTap_LogOutInProgress_Cancel = ( ) =>
  {
    this.setState( {
      Dialog_LogOutInProgress_IsOpen: false
    } );
  };




  //

  Dialog_LogOutFailed( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_LogOutFailed_IsOpen }
        title="Log out failed."
        actions={ [
          <FlatButton key="OK" label="OK" primary={true} onTouchTap={ this._handle_onTouchTap_LogOutFailed_OK } />,
        ] }
      >
        <List subheader=" You are still logged in as">
          <ListItem
            primaryText={ this.props.Viewer.User_DisplayName }
            leftAvatar={<Avatar src={ this.props.Viewer.User_ProfilePhoto } />}
          />
        </List>
        <List subheader={ this.state.Dialog_LogOutFailed_Message } />
      </Dialog>
    );
  }

  _handle_onTouchTap_LogOutFailed_OK = ( ) =>
  {
    this.setState( {
      Dialog_LogOutFailed_IsOpen: false
    } );
  };



  //

  Popover_AuthorizedUser( )
  {
    return (
      <Popover
        open={this.state.Popover_AuthorizedUser_IsOpen}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this._handle_Popover_AuthorizedUser_Close}
      >
        <div style={styles.popover}>
          <List subheader="Logged In as">
            <ListItem
              primaryText={ this.props.Viewer.User_DisplayName }
              leftAvatar={<Avatar src={ this.props.Viewer.User_ProfilePhoto } />}
            />
          </List>
          <Divider />
          <List>
            <ListItem primaryText="Profile" onTouchTap={ this._handle_Popover_AuthorizedUser_Profile } />
            <ListItem primaryText="Change Password" onTouchTap={ this._handle_Popover_AuthorizedUser_ChangePassword } />
          </List>
          <Divider />
          <List>
            <ListItem primaryText="Log in as a different user" onTouchTap={ this._handle_Popover_AuthorizedUser_LogInAsADifferentUser } />
            <ListItem primaryText="Log out" onTouchTap={ this._handle_Popover_AuthorizedUser_LogOut } />
          </List>
        </div>
      </Popover>
    );
  }

  _handle_Popover_AuthorizedUser_Profile = ( ) =>
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: false,
    } );
    this.context.router.push( '/User' );
  };

  _handle_Popover_AuthorizedUser_ChangePassword = ( ) =>
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: false,
    } );
    this.context.router.push( '/User/UpdatePassword' );
  };

  _handle_Popover_AuthorizedUser_LogInAsADifferentUser = ( ) =>
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: false,
    } );
    this.Dialog_AuthenticationChallenge_Open( );
  };

  _handle_Popover_AuthorizedUser_LogOut = ( ) =>
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: false,
      Dialog_LogOutConfirmation_IsOpen: true
    } );
  };

  _handle_Popover_AuthorizedUser_Close = ( ) =>
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: false,
    } );
  };



  //

  render( )
  {
    if( this.props.Viewer.User_IsAnonymous )
      return(
        <IconButton key='login' tooltip="Log In" onTouchTap={ this.Dialog_AuthenticationChallenge_Open }>
          <IconSocialPersonOutline />
          { this.Dialog_AuthenticationChallenge( ) }
          { this.Dialog_AuthenticationInProgress( ) }
          { this.Dialog_AuthenticationFailed( ) }
          { this.Dialog_CreateUser( ) }
          { this.Dialog_CreateUserInProgress( ) }
          { this.Dialog_CreateUserFailed( ) }
        </IconButton>
      );
    else
      // User has already logged in
      return(
        <IconButton key='authenticated' tooltip="User menu" onTouchTap={ this._handle_AuthorizedUserIcon_TouchTap }>
          <IconSocialPerson />
          { this.Popover_AuthorizedUser( ) }
          { this.Dialog_AuthenticationChallenge( ) }
          { this.Dialog_AuthenticationInProgress( ) }
          { this.Dialog_AuthenticationFailed( ) }
          { this.Dialog_CreateUser( ) }
          { this.Dialog_CreateUserInProgress( ) }
          { this.Dialog_CreateUserFailed( ) }
          { this.Dialog_LogOutConfirmation( ) }
          { this.Dialog_LogOutInProgress( ) }
          { this.Dialog_LogOutFailed( ) }
        </IconButton>
      );
  }

  _handle_AuthorizedUserIcon_TouchTap = ( event ) =>
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: true,
      anchorEl: event.currentTarget,
    } );
  };
}

AppBar_Auth.contextTypes = {
  router: React.PropTypes.object.isRequired
};


export default Relay.createContainer( AppBar_Auth, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
        User_DisplayName,
        User_ProfilePhoto,
      }
    `,
  },
});
