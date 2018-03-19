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
        };
      }
    
      componentDidMount = () => {
        //clear  DB -testing
        this.dropTable();
    
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
        console.log('Item Saved');
        // this.clearTxt();
        // Promise()
      };
    
        // Delete course
        deleteItem = (id) => {
          db.transaction(
            tx => {
              tx.executeSql(`delete from item where id = ?;`, [id]);
            }, null, this.updateItemList
          )
          console.log('item deleted');
              
        }
    
      updateItemList = () => {
        console.log("list updated");
    
        db.transaction(tx => {
          tx.executeSql("select * from Item", [], (_, { rows }) =>
            this.setState({ itemList: rows._array })
          );
        },
       null,
      this.clearTxt);
      };
    
      clearTxt = () => {
        this.setState({
          inputAddress: ''
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
                rightTitle={"X"}
                switchButton={false}
                hideChevron
                // onPressRightIcon={()=>{console.log('hola');
                // }}
                // switched={this.state.switch}
                // onPress={()=>{console.log(item.id)}}
                onPress={() => this.deleteItem(item.id)}
                switchThumbTintColor={"green"}
                switchOnTintColor={"black"}
                switchTintColor={"white"}
              />
            ))}
          </List>
        </View>

        <Button
          title="About"
          onPress={() => navigate("Places", { name: "Jose Zapata" })}
        />
      </View>
    );
  }
}
