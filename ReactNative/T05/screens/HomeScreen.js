import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert,FlatList,StatusBar } from 'react-native';
import {styles} from '../App.js'
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {n1: '', n2: '', total: 0,data: []};
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
        this.setState( 
          {n1: '', n2: ''}
       );
      }

      buttonMultiply = () => {
        const num1 = this.state.n1
        const num2 = this.state.n2
        //math operation
        let total = parseInt(num1)  * parseInt(num2);
        //txt
        const totalTxt = `${num1.toString()} * ${num2.toString()} = ${total.toString()}`
        //Alert.alert(totalTxt)
        this.setState( 
          { total : total,
           data : [...this.state.data,{key: totalTxt},],n1: '', n2: '',
         }
       );
      }
      buttonDivide = () => {
        const num1 = this.state.n1
        const num2 = this.state.n2
        //math operation
        let total = parseInt(num1)  / parseInt(num2);
        //txt
        const totalTxt = `${num1.toString()} / ${num2.toString()} = ${total.toString()}`
        //Alert.alert(totalTxt)
        this.setState( 
          { total : total,
           data : [...this.state.data,{key: totalTxt},],n1: '', n2: '',
         }
       );
      }
    static navigationOptions = {
        title: 'Home'
      };

    render() {
        const{ navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.txtOut}>Result {this.state.total} </Text>
            <Text >N1 : {this.state.n1} </Text>
            <Text>N2 : {this.state.n2} </Text>
            <TextInput  style={styles.textbox}  keyboardType='numeric' onChangeText={ (n1) => this.setState( {n1}) } value={this.state.n1.toString()} />
            <TextInput  style={styles.textbox}  keyboardType='numeric'  onChangeText={ (n2) => this.setState( {n2}) } value={this.state.n2.toString()} />
            <Button title="+" color="#000000" onPress={this.buttonAdd} />
            <Button title="-" color="#FF0000" onPress={this.buttonDelete}/>
            <Button title="/" color="#000000" onPress={this.buttonDivide}/>
            <Button title="*" color="#FF0000" onPress={this.buttonMultiply}/>
            <Button title="Clear" color="green" onPress={this.clear}/>
            <Button title="History" color="blue" onPress={()=> navigate('History',{data:this.state.data},{clear: this.clear})}/>
            {/* <View >
              <Text>History</Text>
              <FlatList data={this.state.data}renderItem={({item}) =><Text>{item.key}</Text>} /> 
            </View> */}
          </View>
        )
    }
};
