import React from 'react';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';


let authenticationRequiredCallback = null;

export function registerAuthenticationRequiredCallback( cb )
{
  authenticationRequiredCallback = cb;
}

export class RequiresAuthenticationNotice extends React.Component
{
  componentDidMount( )
  {
    if( authenticationRequiredCallback )
       authenticationRequiredCallback( );
  }

  render( )
  {
    return(
      <Card>
        <CardHeader title="Please log in" />
        <CardText>
          Accessing this area of the application requires you to be logged in.
        </CardText>
      </Card>
    );
  }
}
