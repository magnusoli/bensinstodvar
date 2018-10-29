import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gas: true,
      sort: null
    };
  }
  onPressGas = () => {
    this.setState({ gas: true });
  };
  onPressDisel = () => {
    this.setState({ gas: false });
  };
  onPressShort = () => {
    this.setState({ sort: true });
  };
  onPressCheap = () => {
    this.setState({ sort: false });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.fuel}>
          <TouchableOpacity style={styles.button} onPress={this.onPressGas}>
            <Text>Bensín</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.onPressDisel}>
            <Text>Dísel</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sorting}>
          <TouchableOpacity style={styles.button} onPress={this.onPressShort}>
            <Text>Styst</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.onPressCheap}>
            <Text>Ódýrast</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "black"
  },
  button: {
    borderWidth: 1,
    width: 100,
    height: 50,
    padding: 10,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  fuel: {
    flexDirection: "row"
  },
  sorting: {
    flexDirection: "row"
  }
});
