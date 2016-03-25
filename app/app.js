'use strict';

//import TodoApp from './components/TodoAppSmall';
import TodoApp from './imrsk-example-todo/app/components/ToDoApp';
//import TodoApp from './imrsk-example-todo/app/components/TodoAppSmall';
import TodoAppRoute from './routes/TodoAppRoute';
import React, {
  Component,
} from 'react-native';
import Relay, {
  DefaultNetworkLayer,
  RootContainer,
} from 'react-relay';

let graphQLServerURL = "http://192.168.1.105:4444/graphql";

// Uncomment for connection to server in the cloud. Smarter way to do this will be needed.
// graphQLServerURL = 'http://isomorphic-material-relay.herokuapp.com/graphql';

Relay.injectNetworkLayer( new DefaultNetworkLayer(
  graphQLServerURL,
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
