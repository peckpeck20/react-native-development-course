import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MapView} from 'expo';
// import {axios} from 'axios';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hola</Text>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
