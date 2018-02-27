import React from 'react';
import {StyleSheet, Text, View,TextInput,Button} from 'react-native';
import {MapView} from 'expo';
import axios from 'axios';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       address: '',
       data: ''
    };
    this.fetchData = this.fetchData.bind(this);
  };
  
    
  fetchData() {

      const apiKey = 'AIzaSyBtVK6Z91Qagn4U7-h6x7ofxy9to-pOJRA'
      let address = this.state.address;
      const urlPath = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
    axios
      .get(urlPath)
      .then(response => {

        //console.log(response.data.results[0])
        const data =response.data.results[0] //.geometry.location
        this.setState({data})
        
        
      })
      .catch((error) => {
        console.log(error)
      })
   }

   getLocation(){
     const coordinates = this.state.data

   }

 

  render() {
    //custom map
   const mapStyle= [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8ec3b9"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1a3646"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#64779e"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#334e87"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6f9ba5"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3C7680"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#304a7d"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2c6675"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#255763"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#b0d5ce"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3a4762"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0e1626"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#4e6d70"
        }
      ]
    }
  ]
    return (
      <View style={styles.container}>
        <TextInput style={styles.txtPosition} onChangeText={(address)=> this.setState({address})} />
        <Button title="Show" onPress={this.fetchData}/>
        <MapView
        // provider={'google'}
        customMapStyle={mapStyle}
          style={{
          flex: 1
        }}
          initialRegion={{
            // latitude:
            //   32.7766642,
            //   longitude:
            //   -96.79698789999999
          latitude: 60.201373,
          longitude: 24.934041,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        region={this.state.region}>

          <MapView.Marker
            coordinate={{
            latitude: 60.201373,
            longitude: 24.934041}}
            title='Haaga-Helia'
            />
          < MapView.Marker
            coordinate = {{
            latitude: 60.1632919,
            longitude: 24.8570268}}
            title = 'Crib'
          />
        </MapView>
        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  txtPosition :{
    paddingTop: 40
  }
});
