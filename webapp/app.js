/* @flow weak */

import { browserHistory } from 'react-router';

// First load isomorphic-relay:
import IsomorphicRelay from 'isomorphic-relay';
// And only then load react-relay:
import Relay from 'react-relay';

import IsomorphicRouter from 'isomorphic-relay-router';
import React from 'react';
import ReactDOM from 'react-dom';

import {isomorphicVars} from './scripts/isomorphicVars';
import routes from './routes';

import './styles/main.css';

var isoVars = isomorphicVars( );

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin( );

// Retrieve prepared data
const data = JSON.parse( document.getElementById( 'preloadedData' ).textContent );

// Retrieve the auth token. We know it will be on viewer, but we do not know which fragment.
// Go through them all.
// It is important that User_AuthToken is requested in Chrome.jsx
let User_AuthToken = "";
for( let fragment of data )
{
  const authTokenInThisFragment = fragment.result.Viewer.User_AuthToken;
  if( authTokenInThisFragment != null )
  {
    User_AuthToken = authTokenInThisFragment;
    break;
  }
}

if( User_AuthToken.length == 0 )
  alert( 'Authentication token retrieval failed' );

// Ensure that on the client Relay is passing the HttpOnly cookie with auth, and the user auth token
let GraphQL_URL = ( isoVars.PUBLIC_URL == null ) ? '/graphql' : isoVars.PUBLIC_URL + '/graphql';
Relay.injectNetworkLayer( new Relay.DefaultNetworkLayer(
  GraphQL_URL,
  {
    credentials: 'same-origin',
    headers: {
      user_auth_token: User_AuthToken,
    },
  }
) );

// Pass prepared data to relay
IsomorphicRelay.injectPreparedData( data );

const rootElement = document.getElementById('root');

ReactDOM.render(
    <IsomorphicRouter.Router routes={routes} history={browserHistory} />,
    rootElement
);
