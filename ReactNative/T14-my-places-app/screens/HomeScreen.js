import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { StackNavigator } from "react-navigation";
import { styles } from "../App.js";
import {
  FormLabel,
  FormInput,
  Button,
  Icon,
  List,
  ListItem
} from "react-native-elements";
import Expo, { SQLite } from "expo";

//db init
export const db = SQLite.openDatabase("db.db");

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputAddress: "",
      itemList: [],
      selectedAddress : null,

    };
  }

  componentDidMount = () => {
    //clear  DB -testing
    // this.dropTable();

    //create table
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists Item (id integer primary key not null, address text);"
      );
    });

    this.updateItemList();
  };

  dropTable = () => {
    db.transaction(tx => {
      tx.executeSql("drop table Item;");
    });
  };
//CRUD METHODS
  saveItem = () => {
    db.transaction(
      tx => {
        //INSERT SQL - PREPARED STATEMENT
        tx.executeSql("insert into  Item (address) values (?)", [
          this.state.inputAddress
        ]);
      },
      null,
      this.updateItemList
    );
    console.log("Item Saved");
    // this.clearTxt();
    // Promise()
  };

  selectItem = id => {
    db.transaction(tx => {
      tx.executeSql(`select * from item where id = ?`, [id], (_, { rows }) =>
        console.log(JSON.stringify(rows._array[0].address)),
        // this.setState({
        //   selectedAddress : JSON.stringify(rows._array[0].address)
        // })
      );
    }, null);
  };

  updateItemList = () => {
    console.log("list updated");

    db.transaction(
      tx => {
        tx.executeSql("select * from Item", [], (_, { rows }) =>
          this.setState({ itemList: rows._array })
        );
      },
      null,
      this.clearTxt
    );
  };

  deleteItem = id => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from item where id = ?;`, [id]);
      },
      null,
      this.updateItemList
    );
    console.log("item deleted");
  };





  clearTxt = () => {
    this.setState({
      inputAddress: ""
    });
    console.log("state cleared");
  };

  static navigationOptions = {
    title: "Home"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.screenDef}>
        <StatusBar barStyle="dark-content" />
        <FormLabel>Placefinder</FormLabel>
        <FormInput
          placeholder="Enter an Address"
          onChangeText={inputAddress => {
            this.setState({ inputAddress });
          }}
          value={this.state.inputAddress}
        />
        <View style={styles.buttonView}>
          <Icon
            reverse
            raised
            name="ios-nuclear"
            type="ionicon"
            color="yellow"
            underlayColor="black"
            onPress={this.clearTxt}
          />
          <Icon
            reverse
            raised
            name="add-location"
            color="red"
            onPress={this.saveItem}
          />
        </View>

        <View style={styles.itemView}>
          <List>
            {this.state.itemList.map(item => (
              <ListItem
                key={item.id}
                title={item.address}
                rightIcon={{name: 'place'}}
                switchButton={false}
                // onPress={() => this.selectItem(item.id)}
                onPress={() => navigate("Places", {inputAddress: item.address })}
                onLongPress={()=>{this.deleteItem(item.id)}}
              />
            ))}
          </List>
        </View>

        <Button
          title="Map"
          onPress={() => navigate("Places", { inputAddress: "finland" })}
        />
      </View>
    );
  }
}
