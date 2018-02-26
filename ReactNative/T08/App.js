import React from 'react';
import { StyleSheet, Text, View,TextInput,Picker } from 'react-native';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       data: [],amount: 0,
    };
  };
  
  componentDidMount() {
    axios.get("https://api.fixer.io/latest")
    .then( response =>{
      console.log(response.data.rates)
      this.setState({
        data: response.data.rates
      })
    })
    .catch(error =>{
      console.log(error)
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Currensy Converter!</Text>
        <TextInput keyboardType = 'numeric' onChangeText={(amount) =>{this.setState({amount})}}  style={styles.pad}  placeholder="amount"></TextInput>
        <Picker selectedValue={this.state.data}></Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  pad :{
    padding: 10
  },
});