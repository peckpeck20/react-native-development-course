import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert,FlatList,StatusBar } from 'react-native';
import {styles} from '../App.js'
export default class HistoryScreen extends Component {
    static navigationOptions = {
        title: 'History'
      };
    render() {
    //props
    const {params} = this.props.navigation.state;
        return (
            <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
                 <Text>History</Text>
                 <FlatList data={params.data}renderItem={({item}) =><Text>{item.key}</Text>} /> 
            </View>
        );
    }
}
