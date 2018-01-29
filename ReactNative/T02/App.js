import React from 'react';
import { StyleSheet, Text, View,TextInput,Alert,Button } from 'react-native';

<script src="http://localhost:8097"></script>
export default class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {number: 0, target: 0};
    //this.randomize = this.randomize.bind(this)
  }

  randomize = () => {
    let star = Math.floor(Math.random() * 100)+ 1
    Alert.alert(star.toString())
    this.setState( ()=>{
      return {target: star}
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Guess a number between 1-100</Text>
        <TextInput keyboardType='phone-pad' onChangeText={ (number) => this.setState({ number: parseInt(number) }) }  />
        <Button onPress={this.randomize} title="Make A Guess"/>
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
