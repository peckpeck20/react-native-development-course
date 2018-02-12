import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert,FlatList } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {n1: 0, n2: 0, total: 0,data: []};
  }

  buttonAdd = () => {
    const num1 = this.state.n1
    const num2 = this.state.n2
    //math operation
    let total = parseInt(num1)  + parseInt(num2);
    //txt
    const totalTxt = `${num1.toString()} + ${num2.toString()} = ${total.toString()}`
    //Alert.alert(totalTxt)
    this.setState( 
      { total : total,
       data : [...this.state.data,{key: totalTxt},],n1: '', n2: '',
     }
   );
  }

  buttonDelete = () => {
    const num1 = this.state.n1
    const num2 = this.state.n2
    let total = parseInt(num1)  - parseInt(num2)
    const totalTxt = `${num1.toString()} - ${num2.toString()} = ${total.toString()}`

    this.setState( 
       { total : total,
        data : [...this.state.data,{key: totalTxt}],n1: '', n2: '',
      }
    );

    
  }

  clear = () => {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.txtOut}>Result {this.state.total} </Text>
        <Text >N1 : {this.state.n1} </Text>
        <Text>N2 : {this.state.n2} </Text>
        <TextInput  style={styles.textbox}  keyboardType='numeric' onChangeText={ (n1) => this.setState( {n1}) } value={this.state.n1.toString()} />
        <TextInput  style={styles.textbox}  keyboardType='numeric'  onChangeText={ (n2) => this.setState( {n2}) } value={this.state.n2.toString()} />
        <Button title="+" color="#FF0000" onPress={this.buttonAdd} />
        <Button title="-" color="#000000" onPress={this.buttonDelete}/>
        <View >
          <Text>History</Text>
          <FlatList data={this.state.data}renderItem={({item}) =><Text>{item.key}</Text>} /> 
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:'column',
    justifyContent:  "flex-start",
    paddingVertical : 30
  },

  textbox : {
    borderWidth: 1,
    padding : 12
  },
  txtOut : {
    fontSize :50,
  },

});
