import React from 'react';
import {StyleSheet, Text, View, StatusBar, Button} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {styles} from '../App.js'
import { MapView } from "expo";

export default class PlacesScreen extends React.Component {
  static navigationOptions = {
    title: 'Saved Places'
  };
  render() {

    //passing props
    // const {params} = this.props.navigation.state;
    return (
    //   <View style={styles.screenDef}>
    //     <StatusBar barStyle="dark-content" />
    //     <Text>This app was made by {params.name}</Text>
    //     <Button title="Back" onPress={() => this.props.navigation.goBack()}/>
    //   </View>
    <MapView
    style={{
    flex: 1
  }}
    initialRegion={{
    latitude: 60.201373,
    longitude: 24.934041,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }}>
    <MapView.Marker
      coordinate={{
      latitude: 60.201373,
      longitude: 24.934041}}
      title='Haaga-Helia'
      />
  </MapView>

    );
  }
}
