import React from "react";
import { StyleSheet, Text, TextInput, View, Button, FlatList, Alert } from "react-native";
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

  listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
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
        <TextInput
					placeholder="Product"
					placeholderTextColor="black"
					style={{
						marginTop: 30,
						fontSize: 18,
						width: 200,
						borderColor: "gray",
						borderWidth: 1,
					}}
					onChangeText={(product) => this.setState({ product })}
					value={this.state.product}
				/>
				<TextInput
					placeholder="Amount"
					placeholderTextColor="black"
					keyboardType="numeric"
					style={{
						marginTop: 5,
						marginBottom: 5,
						fontSize: 18,
						width: 200,
						borderColor: "gray",
						borderWidth: 1
					}}
					onChangeText={(amount) => this.setState({ amount })}
					value={this.state.amount}
				/>
				<Button onPress={this.saveItem} title="Save" />
				<Text style={{ marginTop: 30, fontSize: 20 }}>Shopping</Text>
				<FlatList
					style={{ marginLeft: "5%" }}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<View style={styles.listcontainer}>
							<Text style={{ fontSize: 18 }}>
								{item.product}, {item.amount}{" "}
							</Text>
							<Text
								style={{ fontSize: 18, color: "darkblue" }}
								onPress={() => this.deleteItem(item.id)}>
								Bought
							</Text>
						</View>
					)}
					data={this.state.itemList}
					ItemSeparatorComponent={this.listSeparator}
				/>
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
