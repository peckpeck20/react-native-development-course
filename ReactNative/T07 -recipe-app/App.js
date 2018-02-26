import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Button,
  Alert,
  Image
} from 'react-native';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      data: []
    };
  };
  //API fectch
  fetchFood() {
    const url = `http://www.recipepuppy.com/api/?i=${this.state.search}`
    //console.log(url)
    axios
      .get(url)
      .then(response => {
        //console.log(response.data)
        this.setState({data: response.data.results})
      })
      .catch((error) => {
        console.log(error)
      })
  }

  listSeparator = () => {
    return (<View
      style={{
      height: 1,
      width: "100%",
      backgroundColor: "#CED0CE"
    }}/>);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.txtCenter}>Recipies :</Text>
        <TextInput
          onChangeText={(search) => {
          this.setState({search})
        }}
          value={this.state.search}
          style={styles.pad}
          placeholder="what do you have?"></TextInput>
        <Button
          title="Find"
          onPress={this
          .fetchFood
          .bind(this)}
          style={styles.pad}></Button>
        <FlatList style={styles.items} //key for index
          keyExtractor={(x, i) => i} renderItem={({item}) => <Text numberOfLines={3} >
          {item.title}
          <Image
            style={styles.itemImg}
            source={{
            uri: item.thumbnail
          }}></Image>
        </Text>} data={this.state.data} ItemSeparatorComponent={this.listSeparator}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30
  },
  pad: {
    padding: 10
  },
  txtCenter: {
    textAlign: 'center'
  },
  items: {
  },
  itemImg: {
    width: 150,
    height: 150,

  }
});
