import React from "react";
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";

export default class GasList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return fetch("http://apis.is/petrol")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.results
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  displayImage = name => {
    console.log(name);
    if (name == "Atlantsolía") {
      return (
        <Image
          style={{ width: 60, height: 50 }}
          source={require("../myndir/atlantsolía.png")}
        />
      );
    }
    if (name == "N1") {
      return (
        <Image
          style={{ width: 60, height: 50 }}
          source={require("../myndir/n1.png")}
        />
      );
    }
    if (name == "Dælan") {
      return (
        <Image
          style={{ width: 60, height: 50 }}
          source={require("../myndir/dælan.png")}
        />
      );
    }
    if (name == "Orkan") {
      return (
        <Image
          style={{ width: 60, height: 50 }}
          source={require("../myndir/orkan.png")}
        />
      );
    }
    if (name == "Orkan X") {
      return (
        <Image
          style={{ width: 60, height: 50 }}
          source={require("../myndir/orkanX.png")}
        />
      );
    }
    if (name == "Olís") {
      return (
        <Image
          style={{ width: 60, height: 50 }}
          source={require("../myndir/olís.png")}
        />
      );
    }
    if (name == "ÓB") {
      return (
        <Image
          style={{ width: 60, height: 50 }}
          source={require("../myndir/ób.png")}
        />
      );
    }
    if (name == "Costco Iceland") {
      return (
        <Image
          style={{ width: 60, height: 50 }}
          source={require("../myndir/costco.png")}
        />
      );
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <View style={styles.header}>
              <TouchableOpacity style={styles.short}>
                <Text>Shortest</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.best}>
                <Text>Best</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cheap}>
                <Text>Cheapest</Text>
              </TouchableOpacity>
            </View>
          }
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={styles.itemBox}>
              {this.displayImage(item.company)}
              <Text style={styles.company}>{item.company}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text>Bensín verð: {item.bensin95}</Text>
              <Text>Dísel verð: {item.diesel}</Text>
            </View>
          )}
          keyExtractor={({ id }, index) => id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  itemBox: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    padding: 8
  },
  header: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
    height: 50
  },
  short: {
    flex: 3,
    backgroundColor: "powderblue"
  },
  best: {
    flex: 3,
    backgroundColor: "yellow"
  },
  cheap: {
    flex: 3,
    backgroundColor: "red"
  },
  company: {
    fontSize: 20,
    fontWeight: "bold"
  },
  name: {
    fontSize: 15,
    fontStyle: "italic"
  }
});
