import React from "react";
import { StyleSheet, Text, View, StatusBar, Button } from "react-native";
import { StackNavigator } from "react-navigation";
import { styles } from "../App.js";
import { MapView } from "expo";

export default class PlacesScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      addresstxt: '',
      latitude: 0,
      longitude: 0,
      latitudeDelta:0,
      longitudeDelta: 0,
    };

    //props
    const { params } = this.props.navigation.state;
    const inputAddress = params.inputAddress;
    //api call
    this.fetchCoordinates(inputAddress);
  }

  fetchCoordinates(address) {
    const apiKey = "AIzaSyBtVK6Z91Qagn4U7-h6x7ofxy9to-pOJRA";
    console.log(address);
    const urlPath = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;

    fetch(urlPath)
      .then(response => response.json())
      .then(responseJson => {

        const southWestLat =
          responseJson.results[0].geometry.viewport.southwest.lat;
        const southWestLng =
          responseJson.results[0].geometry.viewport.southwest.lng;
        const northEastLat =
          responseJson.results[0].geometry.viewport.northeast.lat;
        const northEastLng =
          responseJson.results[0].geometry.viewport.northeast.lng;

        this.setState({
          data: responseJson.results,
          addresstxt: responseJson.results[0].formatted_address,
          latitude: responseJson.results[0].geometry.location.lat,
          longitude: responseJson.results[0].geometry.location.lng,
          //initial view coord
          latitudeDelta: northEastLat - southWestLat,
          longitudeDelta: northEastLng - southWestLng
        });
      })
      .catch(error => {
        console.error(error);
      });
    console.log("data fetched");
  }



  static navigationOptions = {
    title: "Saved Places"
  };

  render() {
    return (
      //   <View style={styles.screenDef}>
      //     <StatusBar barStyle="dark-content" />
      // <Text>This app was made by {params.inputAddress}</Text>
      //     <Button title="Back" onPress={() => this.props.navigation.goBack()}/>
      //   </View>
      <MapView
        style={{
          flex: 1
        }}
        region={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: this.state.latitudeDelta,
          longitudeDelta: this.state.longitudeDelta
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: this.state.latitude,
            longitude: this.state.longitude
          }}
          title={this.state.addresstxt}
        />
      </MapView>
    );
  }
}
