import React from 'react';
import {StyleSheet, Text, View, StatusBar, Button} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {styles} from './App.js'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'About'
  };
  render() {

    //passing props
    const {params} = this.props.navigation.state;
    return (
      <View style={styles.screenDef}>
        <StatusBar barStyle="dark-content" />
        <Text>This app was made by {params.name}</Text>
        <Button title="Back" onPress={() => this.props.navigation.goBack()}/>
      </View>

    );
  }
}
