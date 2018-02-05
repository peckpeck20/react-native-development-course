import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {n1: 0, n2: 0, total: 0};
  }

  buttonAdd = () => {

    let total = parseInt(this.state.n1)  + parseInt(this.state.n2)
    //Alert.alert(total)
    this.setState(() => {
      return { total : total}
    });
  }

  buttonDelete = () => {
    let total = parseInt(this.state.n1)  - parseInt(this.state.n2)
    //Alert.alert(total)

    this.setState(() => {
      return { total : total}
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Result :{this.state.total} </Text>
        <Text>N1 : {this.state.n1} </Text>
        <Text>N2 : {this.state.n2} </Text>
        <TextInput style={styles.textbox}  keyboardType='numeric' onChangeText={ (n1) => this.setState( {n1}) } />
        <TextInput style={styles.textbox}  keyboardType='numeric'  onChangeText={ (n2) => this.setState( {n2}) } />
        <Button title="+" onPress={this.buttonAdd} />
        <Button title="-" onPress={this.buttonDelete}/>
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

  textbox : {
    width: 250,
    borderWidth: 0.5
  },
});
