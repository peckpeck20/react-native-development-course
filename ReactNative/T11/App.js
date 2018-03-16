import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Platform
} from "react-native";
import { MapView, Location, Permissions } from "expo";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      location: null,
      errorMessage: null,
      locationlock: false
    };
  }

  getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    console.log(location);
    this.setState({ locationlock: true });
  };

  renderMarker = () => {
    return (
      <MapView.Marker
        coordinate={{
          latitude: this.state.location.coords.latitude,
          longitude: this.state.location.coords.latitude
        }}
        title="My location"
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Console" onPress={e => console.log(e.nativeEvent)} />
        <Button title="locate" onPress={this.getLocationAsync} />
        <MapView style={styles.mapStyle} region={this.state.region}>
          {/* if the state is true then call the render function */}
          {this.state.show ? this.renderMarker() : null}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24
  },

  mapStyle: {
    flex: 1
  }
});
