import React from 'react';
import { StyleSheet, Text, View,AsyncStorage,Alert,Button } from 'react-native';

export default class App extends React.Component {
  saveData = async () => {
    try{
      await AsyncStorage.setItem('key01','Hello from local Storage!')
    } catch (error){
      Alert.alert('hell')
    } 
  }

  readData = async () => {
    try{
      let dataValue = await AsyncStorage.getItem('key01')
      Alert.alert(dataValue)
    }catch (error){
      Alert.alert("data corrupted")
    }
  }

  componentDidMount(){
    this.saveData()

  }
  render() {
    return (
      <View style={styles.container}>
        <Button title="Show data" onPress={this.readData}></Button>
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
