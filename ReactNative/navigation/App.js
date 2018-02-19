import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {StackNavigator} from'react-navigation';
import HomeScreen from './homeScreen';
import aboutScreen from './aboutScreen';

const MyApp = StackNavigator({
  Home: { screen: HomeScreen },
  About: { screen: aboutScreen },
});

export default class App extends React.Component {
  render() {
    return <MyApp/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
