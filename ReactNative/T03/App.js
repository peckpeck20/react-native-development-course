import React from 'react';
import { StyleSheet, Text, View,Button,TextInput,FlatList } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTxt : "",
      data : []
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput onChangeText={ (text) => this.setState({inputTxt : text})}></TextInput>
        <Button title="click"></Button>
        <View>
        <FlatList data={this .state.data} renderItem={({item}) =><Text>{item.key}   </ Text>}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
