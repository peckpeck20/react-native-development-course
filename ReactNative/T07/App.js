import './ReactotronConfig';
import React from 'react';
import { StyleSheet, Text, View,TextInput,Alert,Button,AsyncStorage } from 'react-native';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {number: 0, target: 0, tries: 1,highScore: 0,textStatus: "Guess a number between 1-100"};
  }

  randomize = () => {
    let star = Math.floor(Math.random() * 100)+ 1
    this.setState({
      target: star,
      tries: 1
    });
  }

  checkNumber = () => {
     const randomNumber = this.state.target;
     const inputNumber = this.state.number;
     const count = this.state.tries;
     const highScore = this.state.highScore;
     const textCheck = (randomNumber < inputNumber)? "too high" : "too low"

     if (randomNumber === inputNumber) {
       this.setState(
         {tries :count + 1 }
       );
      //set highscore
      if(this.state.tries > this.state.highScore){
        //set new score
        this.saveData()
        //update new high score
        this.readData()
      }else {
        //console.log('nahh')
      }
      Alert.alert("Correct! you guessed it in "+ parseInt(count));
      //re-run game
      this.randomize()

     } else {
      this.setState(
        {tries :count + 1,
        textStatus : textCheck }
      );
      Alert.alert("Try again");
     }
  }

  componentDidMount(){
    AsyncStorage.clear()
    this.randomize()
    this.readData()
  }

  saveData = async () => {
    try{
       let tries = this.state.tries
       //let highScore = this.state.highScore
       await AsyncStorage.setItem('k01',tries.toString())
       console.log('data saved')
    } catch (error){
      Alert.alert('error saving data')
    } 
  }

  readData = async () => {
    try{
      let dataValue = await AsyncStorage.getItem('k01')
      console.log('read data is'+ dataValue)
      if(dataValue != null){
        this.setState({
          highScore:dataValue
        })
      }

    }catch (error){
      console.log(error)
    }
  }
  


  render() {

    return (
      <View style={styles.container}>
        <Text> {this.state.textStatus}</Text>
        <TextInput keyboardType='phone-pad' onChangeText={ (number) => this.setState({ number: parseInt(number) }) }  />
        <Button onPress={this.checkNumber} title="Make A Guess"/>
        <Text>Highscore: {this.state.highScore} guesses</Text>
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
