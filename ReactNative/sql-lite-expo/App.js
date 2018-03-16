import React from "react";
import { StyleSheet, Text, TextInput, View, Button, FlatList, Alert } from "react-native";
import { SQLite } from "expo";

//db init
const db = SQLite.openDatabase("tester.db");
// console.log(db);

componentDidMount = () => {
  db.transaction(
    tx =>{
      tx.executeSql('create table if not exists Course (id integer primary key not null, credits int, title text);')
    }
  );
};

saveItem = () =>{
  db.transaction(
    tx => {
      tx.executeSql(
        //SQL PREPARED STATEMENT 
        'insert into course (credits, title) values (?, ?)',
        //Placeholder values
        [parseInt(this.state.credit),this.state.title],
        null,
        
      )
    }
  )
}


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      credit: "",
      title: "",
      courses: []
    };
  }

  render() {
    return (
      <View style={styles.container}>
<TextInput placeholder='Title' style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}/>  
        <TextInput placeholder='Credits' keyboardType="numeric" style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(credit) => this.setState({credit})}
          value={this.state.credit}/>      
        <Button onPress={this.saveItem} title="Save" /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
