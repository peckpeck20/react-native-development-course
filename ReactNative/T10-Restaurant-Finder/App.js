import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import axios from "axios";
import { MapView } from "expo";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      // data: null,
      latitude: 0,
      longitude: 0,
      restaurants: []
      // latitute: "-33.8670522",
      // longitude: "151.1957362"
    };

    //use this word inside function
    this.FetchCords = this.FetchCords.bind(this);
    this.fetchRestaurants = this.fetchRestaurants.bind(this);
    this.onClickFetch = this.onClickFetch.bind(this);
  }

  //api call - takes address and sets coordinates in state
  FetchCords = (address)  => {
    const apiKey = "AIzaSyBtVK6Z91Qagn4U7-h6x7ofxy9to-pOJRA";
    const urlPath = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
     return axios.get(urlPath)
      // .then(response => {
      //   const latitude = response.data.results[0].geometry.location.lat;
      //   const longitude = response.data.results[0].geometry.location.lng;
      //   this.setState({ latitude, longitude });
      // })
      // .catch(error => {
      //   console.log(error);
      // });
  }
  //gets an array of restaurants
  fetchRestaurants =() => {
    // this.FetchCords(this.state.address);

    const apiKey = "AIzaSyA-3Uic4wJe6y2iHUPaQlZH43IrqyVD014";
    let coordinates = `${this.state.latitude},${this.state.longitude}`;
    const urlPath = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates}&radius=500&type=restaurant&key=${apiKey}`;

    return axios.get(urlPath)
      // .then(response => {
      //   const restaurants = response.data.results;
      //   this.setState({ restaurants });
      // })
      // .catch(error => {
      //   console.log(error);
      // });
  }

  onClickFetch(){
    axios.all([this.FetchCords(this.state.address), this.fetchRestaurants()])
  .then(axios.spread((coordinateFetch, restaurantFetch) => {
    // Both requests are now complete
    // console.log(coordinateFetch.data.results[0])
          // .then(response => {
        const latitude = coordinateFetch.data.results[0].geometry.location.lat;
        const longitude = coordinateFetch.data.results[0].geometry.location.lng;
        this.setState({ latitude, longitude });
        const restaurants = restaurantFetch.data.results;
        this.setState({ restaurants });
      
      // .catch(error => {
      //   console.log(error);
      // });

  }));
  }

  // renderMarkers = (restaurants) => {

  // };



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
            onPress={this.onClickFetch}
          />
        </View>

        <View style={styles.v1}>
          {/* <Button color="black" title="Test" onPress={this.renderMarker} /> */}

          <MapView
            style={styles.mapStyle}
            initialRegion={{
              latitude: 60.200692,
              longitude: 24.934302,
              latitudeDelta: 0.0322,
              longitudeDelta: 0.0221
            }}
            customMapStyle={mapStyle}
          >
            {this.state.restaurants.map((marker, index) => (
              <MapView.Marker
                key={index}
                coordinate={{
                  latitude: marker.geometry.location.lat,
                  longitude: marker.geometry.location.lng
                }}
                title={marker.name}
                description={marker.vicinity}
              />
            ))}
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
