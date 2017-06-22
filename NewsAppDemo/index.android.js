/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
//引入外部的组件
var Main = require('./Compoent/Main');
export default class NewsAppDemo extends Component {
  render() {
    return (
      <Main />
    );
  }
}

const styles = StyleSheet.create({
  
});

AppRegistry.registerComponent('NewsAppDemo', () => NewsAppDemo);
