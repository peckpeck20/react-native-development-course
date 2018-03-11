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
import { MapView, Location, Permissions, Constants } from "expo";
import axios from "axios";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //API FETCH
      address: "",
      mapLight: true,

      data: {},
      initialRegion: {
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221
      },
      location: null,
      errorMessage: null,
      show: false
    };
    //use this word inside function
    this.onClickfetchData = this.onClickfetchData.bind(this);
    this.turnOfflights = this.turnOfflights.bind(this);
    this.turnOnlights = this.turnOnlights.bind(this);
  }

  turnOnlights() {
    this.setState({ mapLight: true });
  }

  turnOfflights() {
    this.setState({ mapLight: false });
  }
  //api call - takes address and returns coordinates
  onClickfetchData() {
    const apiKey = "AIzaSyBtVK6Z91Qagn4U7-h6x7ofxy9to-pOJRA";
    let address = this.state.address;
    const urlPath = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
    axios
      .get(urlPath)
      .then(response => {
        // console.log(urlPath);
        //console.log(response.data.geometry.location);
        const data = response.data.results[0].geometry.location;
        //console.log(data);
        this.setState({ data, show: true });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getLocationAsync = async () => {
    Alert.alert("getting location");
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  renderMarker = () => {
    return (
      <MapView.Marker
        coordinate={{
          latitude: this.state.data.lat,
          longitude: this.state.data.lng
        }}
        title="Search Result"
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.v2}>
          <TextInput
            style={styles.txtPosition}
            onChangeText={address => this.setState({ address })}
          />
          <Button
            color={"red"}
            title="Search"
            onPress={this.onClickfetchData}
          />
          <Button title="Find me" onPress={this.getLocationAsync} />
        </View>

        <View style={styles.v1}>
          {/* <Button color="black" title="Test" onPress={this.renderMarker} /> */}
          <MapView
            // mapProperties
            style={styles.mapStyle}
            let
            customMapStyle={null}
            customMapStyle={mapStyle}
            initialRegion={this.state.initialRegion}
            provider={"google"}
            showsUserLocation={true}
            followsUserLocation={true}
            loadingEnabled={true}
            showsScale={true}
          >
            {/* if the state is true then call the render function */}
            {this.state.show ? this.renderMarker() : null}
          </MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24
  },
  v1: {
    flex: 9
  },
  v2: {
    flex: 3,
    backgroundColor: "black"
    // paddingTop: 60
  },
  mapStyle: {
    flex: 1
  },
  f1: {
    backgroundColor: "yellow"
    // flex: 9
  },
  txtPosition: {
    paddingTop: 10,
    paddingBottom: 19,
    color: "white",
    fontSize: 20
  }
  // f2: {
  //   backgroundColor: "#40ff00",
  //   flex: 1
  // }
  // f3: {
  //   backgroundColor: "skyblue",
  //   flex: 1
  // }
});
//Dark custom map
const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8ec3b9"
      }
    ]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1a3646"
      }
    ]
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#64779e"
      }
    ]
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878"
      }
    ]
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#334e87"
      }
    ]
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#023e58"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#283d6a"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6f9ba5"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#023e58"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3C7680"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#304a7d"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#2c6675"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#255763"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#b0d5ce"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#023e58"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    featureType: "transit.line",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#283d6a"
      }
    ]
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#3a4762"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#0e1626"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#4e6d70"
      }
    ]
  }
];
