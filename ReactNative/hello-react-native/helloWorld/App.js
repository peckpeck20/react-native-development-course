import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Image } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  buttonPressed = () => {
    Alert.alert(this.state.text);
  }


  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={ require('./img/cookie.jpg')}  />
        <Text>Cookie?</Text>
        <TextInput style={styles.textbox} onChangeText={ (text) => this.setState({text}) } value={this.state.text}  />
        <Button title="Send" onPress={this.buttonPressed} />

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',   
  },

  textbox : {
    width: 400,
    borderColor: 'gray',
    borderWidth: 1
  },

  image : {
    width: 200,
    height: 150
  },

});



