import React from 'react';
import { StyleSheet, Text, View,TextInput,Picker } from 'react-native';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       data: [],
       amount: 0,
       pickedCurrensy: ''
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

  //generate pickers
  renderPickItems = () => {
    let storeData = []
    //in word is used object
    for ( var currencyType in this.state.data){
      var pickerItem = <Picker.Item label= {currencyType} value= {currencyType} key={currencyType} />
      storeData.push(pickerItem)
    }
    return storeData
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Currensy Converter!</Text>
        <TextInput keyboardType = 'numeric' onChangeText={(amount) =>{this.setState({amount})}}  style={styles.pad}  placeholder="amount"></TextInput>
        <Picker 
          selectedValue={this.state.pickedCurrensy}
          mode="dropdown" 
          onValueChange={ (itemValue, itemIndex)=>{this.setState({pickedCurrensy:itemValue})} }

        >
          {this.renderPickItems()}
        </Picker>
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
