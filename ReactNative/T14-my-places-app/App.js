import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { StackNavigator } from "react-navigation";
import HomeScreen from './screens/HomeScreen';
import PlacesScreen from './screens/PlacesScreen';
import {
  FormLabel,
  FormInput,
  Button,
  Icon,
  List,
  ListItem
} from "react-native-elements";

const MyApp = StackNavigator(
  {
    Home: { screen: HomeScreen },
    Places: { screen: PlacesScreen }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <MyApp />;
  }
}

export const styles = StyleSheet.create({
  //css used for screens
  screenDef: {
    flex: 1,
    paddingTop: 25
  },
  buttonView: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row"
  },
  itemView: {
    flex: 5
  },
  mapView:{
    flex:1
  },
});
