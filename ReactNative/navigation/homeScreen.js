import React from 'react';
import { StyleSheet, Text, View,Button,StatusBar } from 'react-native';
import {StackNavigator} from'react-navigation';


export default class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Home',
    };
    render() {
      
      const { navigate } = this.props.navigation;
      return (
         <View>
            <StatusBar hidden={true} />
            <Text>Welcome to my jungle!</Text>
            <Button title="About" onPress={ () => navigate('About')} />
        </View>
        
      );
    }
  }