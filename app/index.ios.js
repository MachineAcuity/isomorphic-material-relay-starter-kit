'use strict';

import React, {
  AppRegistry,
} from 'react-native';
import CodeFoundriesApp from './app';

console.ignoredYellowBox = [
  // FIXME: https://github.com/facebook/react-native/issues/1501
  'Warning: ScrollView doesn\'t take rejection well - scrolls anyway',
];

AppRegistry.registerComponent('CodeFoundriesApp', () => CodeFoundriesApp);
