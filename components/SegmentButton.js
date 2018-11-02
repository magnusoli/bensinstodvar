import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gasColor: "lightblue",
      diselColor: "white",
      shortColor: "white",
      cheapColor: "white"
    };
  }
  onPressGas = () => {
    this.setState(
      { gasColor: "lightblue", diselColor: "white" },
      function() {}
    );
    this.props.changeFuel(true);
  };
  onPressDisel = () => {
    this.setState(
      { gasColor: "white", diselColor: "lightblue" },
      function() {}
    );
    this.props.changeFuel(false);
  };
  onPressShort = () => {
    this.setState(
      { shortColor: "lightgreen", cheapColor: "white" },
      function() {}
    );
    this.props.changeSort(true);
  };
  onPressCheap = () => {
    this.setState(
      { shortColor: "white", cheapColor: "lightgreen" },
      function() {}
    );
    this.props.changeSort(false);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.fuel}>
          <View
            style={[
              styles.buttonleft,
              { backgroundColor: this.state.gasColor }
            ]}
          >
            <TouchableOpacity onPress={this.onPressGas}>
              <Text>Bensín</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.buttonleft,
              { backgroundColor: this.state.diselColor }
            ]}
          >
            <TouchableOpacity onPress={this.onPressDisel}>
              <Text>Dísel</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sorting}>
          <View
            style={[
              styles.buttonright,
              { backgroundColor: this.state.shortColor }
            ]}
          >
            <TouchableOpacity onPress={this.onPressShort}>
              <Text>Styst</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.buttonright,
              { backgroundColor: this.state.cheapColor }
            ]}
          >
            <TouchableOpacity onPress={this.onPressCheap}>
              <Text>Ódýrast</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",

    flexDirection: "row",
    padding: 5
  },
  buttonleft: {
    borderWidth: 1,
    width: 80,
    height: 50,
    padding: 10,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonright: {
    borderWidth: 1,
    width: 80,
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
