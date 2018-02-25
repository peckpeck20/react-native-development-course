import React from 'react';
import { StyleSheet, Text, View,TextInput,Alert,Button } from 'react-native';

<script src="http://localhost:8097"></script>
export default class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {number: 0, target: 0, tries: 1,textStatus: "Guess a number between 1-100"};
    //this.randomize = this.randomize.bind(this)
  }

  randomize = () => {
    let star = Math.floor(Math.random() * 100)+ 1
    //Alert.alert(star.toString())
    this.setState( ()=>{
      return {target: star}
    });
  }

  checkNumber = () => {
     const randomNumber = this.state.target;
     const inputNumber = this.state.number;
     const count = this.state.tries;
     //const statusTxt = "your guess hh ${ inputNumber } is too small"
     //const status = this.state.textStatus;

     const textCheck = (randomNumber < inputNumber)? "too high" : "too low"

     if (randomNumber === inputNumber) {
       this.setState(
         {tries :count + 1 }
       );
      Alert.alert("Correct! you guessed it in "+ parseInt(count));
     } else {
      this.setState(
        {tries :count + 1,
        textStatus : textCheck }
      );
      Alert.alert("Try again");
     }
     //Alert.alert("check");
  }

  componentDidMount(){
    // {Alert.alert("hola")}
    {this.randomize()}
    //Alert.alert("mounted")

  }
  


  render() {

    return (
      <View style={styles.container}>
        <Text> {this.state.textStatus}</Text>
        <TextInput keyboardType='phone-pad' onChangeText={ (number) => this.setState({ number: parseInt(number) }) }  />
        <Button onPress={this.checkNumber} title="Make A Guess"/>
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
