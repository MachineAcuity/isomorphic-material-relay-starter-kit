/* @flow weak */

import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardActions from 'material-ui/lib/card/card-actions';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import TextField from 'material-ui/lib/text-field';

import Translaticiarum_addMutation from '../mutations/Translaticiarum_addMutation';

import Translaticiarum_Properties from './Translaticiarum_Properties.jsx';


class Translaticiarum_Screen extends React.Component
{
  _handle_updateHandler_Translaticiarum_Add = ( Translaticiarum_properties ) =>
  {
    Relay.Store.commitUpdate(
      new Translaticiarum_addMutation( { ...Translaticiarum_properties, Viewer: this.props.Viewer } )
    );
  };

  _handle_onTouchTap_Add = ( ) =>
  {
    this.refs.Translaticiarum_Properties._handle_Open( );
  };

  render( )
  {
    return (
      <Card initiallyExpanded={true}>

        <CardHeader initiallyExpanded={true} title="Translaticiarum" subtitle="This means routine in Latin" />

        { this.props.children }

        <CardActions initiallyExpanded={true}>
          <FloatingActionButton
						secondary={true}
						linkButton={true}
						mini={true}
						style={ {float: 'right', marginBottom: 15, marginRight: 15 } }
            actAsExpander={true}
            onTouchTap={ this._handle_onTouchTap_Add }
          >
            <ContentAdd />
          </FloatingActionButton>
        </CardActions>

        <Translaticiarum_Properties
          ref="Translaticiarum_Properties"
          Translaticiarum_Type={ 1 }
          Translaticiarum_Date={ new Date( ).toJSON( ) }
          Translaticiarum_Time={ new Date( ).toJSON( ) }
          updateHandler={ this._handle_updateHandler_Translaticiarum_Add }
        />

      </Card>
    );
  }
}

export default Relay.createContainer( Translaticiarum_Screen, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        ${Translaticiarum_addMutation.getFragment('Viewer')},
      }
    `,
  },
});
