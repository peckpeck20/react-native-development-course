import React from 'react';
import { StyleSheet, Text, View,TextInput,FlatList,Button,Alert } from 'react-native';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      jobs: [], description: '', location: '',
    };
  };
  //API fectch 
  fetchjobs(){
    const url =`https://jobs.github.com/positions.json?description=${this.state.description}&location=${this.state.location}`
   //console.log(url)
   axios.get(url)
   .then( response =>{
     //console.log(response.data)
     this.setState({
       jobs: response.data
     })
   })
   .catch((error) =>{
     console.log(error)
   })
  }

  listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.txtCenter}>GitHub Jobs!</Text>
        <TextInput onChangeText={(description) =>{this.setState({description})}}  value={this.state.description} style={styles.pad} placeholder="description"></TextInput>
        <TextInput onChangeText={(location) =>{this.setState({location})}} value={this.state.location} style={styles.pad} placeholder="location"></TextInput>
        <Button title="Find" onPress={this.fetchjobs.bind(this)} style={styles.pad}></Button>
        <FlatList keyExtractor={item => item.id} renderItem={({item}) => <Text> {item.title} {item.company} {item.company_url}  </Text>} data={this.state.jobs} ItemSeparatorComponent={this.listSeparator} />
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
  txtCenter :{
    textAlign: 'center'
  }
});
