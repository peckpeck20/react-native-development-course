import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert,FlatList } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {item: '', itemList: [] }
  }



  addItem = () => {
    this.setState({
      itemList: [...this.state.itemList,{key: this.state.item}],
      //clears item after its been added
      item : '',
    })
  }
  
    clearTxt = () => {
      this.setState({
        itemList: ''
      })
    }



  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.textbox}  onChangeText={ (item) => this.setState( {item} )} value={this.state.item.toString()}/>
        <Button title="Add" onPress= { this.addItem } />
        <Button title="Clear" onPress={ this.clearTxt } color="blue" />
        <Text style={styles.header}>Shopping List</Text>
        <FlatList data={this.state.itemList} renderItem={({item}) => <Text style={styles.bodyTxt}>{item.key}</Text> } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent:  "flex-start",
    paddingVertical : 23
  },
  textbox : {
    borderWidth: 1.5,
    padding : 12
  },

  header : {
    fontWeight: 'bold',
    fontSize: 20,
    color :'blue',
    textAlign: 'center',
    padding : 12,
  },

  bodyTxt : {
    textAlign: 'center',
  }

});
