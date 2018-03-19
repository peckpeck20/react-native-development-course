import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert,FlatList } from 'react-native';
import{StackNavigator} from'react-navigation';
import HomeScreen from './screens/HomeScreen';
import HistoryScreen from './screens/HistoryScreen';

const MyApp = StackNavigator({
  Home : {screen : HomeScreen},
  History : {screen :HistoryScreen}
},);
export default class App extends React.Component {


  render() {
    return <MyApp/>
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:'column',
    justifyContent:  "flex-start",
    paddingVertical : 30
  },

  textbox : {
    borderWidth: 1,
    padding : 12
  },
  txtOut : {
    fontSize :30,
    textAlign: 'center'
  },
  //css used for screens
  screenDef : {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  }

});
