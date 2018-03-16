import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
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
const db = SQLite.openDatabase("db.db");
//console.log(db);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: "",
      amount: "",
      itemList: [],
      switch: false
    };
  }

  componentDidMount = () => {
    //clear  DB -testing
    // this.dropTable();

    //create table
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists Item (id integer primary key not null, product text, amount text);"
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
        tx.executeSql("insert into  Item (product, amount) values (?, ?)", [
          this.state.product,
          this.state.amount
        ]);
      },
      null,
      this.updateItemList
    );
    console.log('Item Saved')
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
    });
  };

  clearTxt = () => {
    this.setState({
      product: "",
      amount: ""
    });
  };

  // buttonPressed = () => {
  //   this.setState({ switch: !this.state.switch });
  // };

  // OLD WAY
  // addItem = () => {
  //   let itemObj = {};
  //   itemObj.item = this.state.item;
  //   itemObj.product = this.state.product;
  //   // itemObj.status =

  //   this.setState({
  //     //add item to the list array
  //     itemList: [...this.state.itemList, itemObj]
  //   });
  //   //clears item after its been added
  //   this.clearTxt();
  // };
  // renderRow(rowData, sectionID) {
  //   return (
  //     <ListItem
  //       key={sectionID}
  //       title={rowData.product}
  //       subtitle={rowData.item}
  //     />
  //   );
  // }

  render() {
    // console.log(this.state.itemList.key)
    return (
      <View style={styles.container}>
        <FormLabel>Product</FormLabel>
        <FormInput
          onChangeText={product => {
            this.setState({ product });
          }}
          value={this.state.product}
        />
        <FormLabel>amount</FormLabel>
        <FormInput
          onChangeText={amount => {
            this.setState({ amount });
          }}
          value={this.state.amount}
        />
        <View style={styles.buttonView}>
          <Icon
            reverse
            name="ios-nuclear"
            type="ionicon"
            color="red"
            raised={true}
            underlayColor="yellow"
            onPress={this.clearTxt}
          />
          <Icon
            reverse
            name="sc-telegram"
            type="evilicon"
            color="green"
            raised={true}
            underlayColor="green"
            onPress={this.saveItem}
          />
        </View>

        <View style={styles.itemView}>
          <List>
            {this.state.itemList.map(item => (
              <ListItem
                key={item.id}
                title={item.product}
                subtitle={item.amount}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonView: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row"
  },
  itemView: {
    flex: 5
    // backgroundColor: "blue"
  }
});
