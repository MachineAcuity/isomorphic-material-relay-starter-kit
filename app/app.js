'use strict';

import TodoApp from './components/TodoAppSmall';
import TodoAppRoute from './routes/TodoAppRoute';
import React, {
  Component,
} from 'react-native';
import Relay, {
  DefaultNetworkLayer,
  RootContainer,
} from 'react-relay';

Relay.injectNetworkLayer( new DefaultNetworkLayer(
  'http://localhost:4444/graphql',
  {
    headers: {
      user_auth_token: 'Hello. My name is React Native and I want access to your wonderful GraphQL server. kthx.',
    },
  }
) );

export default class CodeFoundriesApp extends Component {
  render(): void {
    return (
      <RootContainer
        Component={TodoApp}
        route={new TodoAppRoute({status: 'any'})}
      />
    );
  }
}
