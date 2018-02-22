import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {StackNavigator} from 'react-navigation';
import HomeScreen from './homeScreen';
import aboutScreen from './aboutScreen';

const MyApp = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  About: {
    screen: aboutScreen
  }
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
});

export default class App extends React.Component {

  render() {
    return <MyApp/>

  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  //css used for screens
  screenDef : {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  }
});
