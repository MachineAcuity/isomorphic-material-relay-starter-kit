'use strict';

import {
  Route,
} from 'react-relay';

export default class TodoAppRoute extends Route {
  static paramDefinitions = {
    status: {required: false},
  };
  static queries = {
    Viewer: () => Relay.QL`query { Viewer }`,
  };
  static routeName = 'TodoAppRoute';
}
