import React from "react";
import { Text, View, StyleSheet, Switch } from "react-native";

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      display: false
    };
    this.images = {
      N1: require("../myndir/n1.png"),
      Dælan: require("../myndir/dælan.png"),
      "Costco Iceland": require("../myndir/costcoiceland.png"),
      Atlantsolía: require("../myndir/atlantsolía.png"),
      ÓB: require("../myndir/ób.png"),
      Olís: require("../myndir/olís.png"),
      Orkan: require("../myndir/orkan.png"),
      "Orkan X": require("../myndir/orkanx.png")
    };
  }
  displayImage = name => {
    return (
      <Image style={{ width: 60, height: 50 }} source={this.images[name]} />
    );
  };

  render() {
    this.state.item = this.props.item;

    return (
      <View style={styles.listLine}>
        <Switch value={this.state.done} onValueChange={this.handleSwitch} />
        <Text>{this.state.name}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  listLine: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    padding: 20,
    borderWidth: 0.5,
    borderColor: "#aaa"
  }
});
