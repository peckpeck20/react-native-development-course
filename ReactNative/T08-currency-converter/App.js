import React from "react";
import { StyleSheet, Text, View, TextInput, Picker,Button } from "react-native";
import axios from "axios";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      amount: 0,
      pickedCurrency: "",
      pickedCurrencyIndex : 0,
      total : 0
    };
  }

  componentDidMount() {
    axios
      .get("https://api.fixer.io/latest")
      .then(response => {
        //console.log(response.data.rates);
        this.setState({
          data: response.data.rates
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  //generate picker items
  renderPickItems = () => {
    let storeData = [];
    //in word is used object
    for (var currencyType in this.state.data) {
      var pickerItem = (
        <Picker.Item
          label={currencyType}
          value={currencyType}
          key={currencyType}
        />
      );
      storeData.push(pickerItem);
    }
    return storeData;
  };

  calculateValue = () => {
    let originalAmount = this.state.amount
    let pickedCurrency = this.state.pickedCurrency
    let exchangeRates = this.state.data 
    let selectedRate =exchangeRates[pickedCurrency]
    let total = (originalAmount/selectedRate).toFixed(2)
    this.setState({
      total
    })
    
    

    console.log(total)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Currency Converter </Text>
        <Text>Total {this.state.total} €</Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={amount => {
            this.setState({ amount: parseInt(amount ) });
          }}
          style={styles.pad}
          placeholder="amount"
        />
        <Picker
          selectedValue={this.state.pickedCurrency}
          mode="dropdown"
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ pickedCurrency: itemValue,
                            pickedCurrencyIndex : itemIndex
            });
          }}
        >
          {this.renderPickItems()}
        </Picker>
        <Button color="blue" title="Convert" onPress={this.calculateValue}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30
  },
  pad: {
    padding: 10
  }
});
