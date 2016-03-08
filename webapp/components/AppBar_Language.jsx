/* @flow weak */

import React from 'react';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import MenuItem from 'material-ui/lib/menus/menu-item';

import {
  Icon_Flag_BG,
  Icon_Flag_DE,
  Icon_Flag_FR,
  Icon_Flag_IN,
  Icon_Flag_US
} from 'material-ui-country-flags';

export default class AppBar_Language extends React.Component
{
  _handle_onItemTouchTap_Language = ( e, item ) =>
  {
    console.log( 'Choose language: ' + item.key );
  };

  render( )
  {
    return(
      <IconMenu key="top-language"
        anchorOrigin={ { vertical: "bottom", horizontal: "right" } }
        onItemTouchTap={ this._handle_onItemTouchTap_Language }
        iconButtonElement={
          <IconButton><Icon_Flag_BG /></IconButton>
        }
      >
        <MenuItem style={ { backgroundColor: '#f5f5f5' } } key="BG" checked={ true } primaryText="Български" />
        <MenuItem style={ { backgroundColor: '#f5f5f5' } } key="DE" leftIcon={ <Icon_Flag_DE /> } primaryText="Deutsch" />
        <MenuItem style={ { backgroundColor: '#f5f5f5' } } key="FR" leftIcon={ <Icon_Flag_FR /> } primaryText="Français" />
        <MenuItem style={ { backgroundColor: '#f5f5f5' } } key="IN" leftIcon={ <Icon_Flag_IN /> } primaryText="मानक हिन्दी" />
        <MenuItem style={ { backgroundColor: '#f5f5f5' } } key="US" leftIcon={ <Icon_Flag_US /> } primaryText="English" />
      </IconMenu>
    );
  }
}
