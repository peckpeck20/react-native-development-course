import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {StackNavigator} from'react-navigation';


export default class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'About',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
         <View>
            <Text>About this app!</Text>
        </View>
        
      );
    }
  }