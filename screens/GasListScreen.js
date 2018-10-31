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
import SegmentButton from "../components/SegmentButton";

export default class GasListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      fuel: "bensin"
    };
    this.images = {
      N1: require("../myndir/n1.png"),
      Dælan: require("../myndir/dælan.png"),
      "Costco Iceland": require("../myndir/costcoiceland.png"),
      Atlantsolía: require("../myndir/atlantsolía.png"),
      ÓB: require("../myndir/ób.png"),
      Olís: require("../myndir/olís.png"),
      Orkan: require("../myndir/orkan.png"),
      "Orkan X": require("../myndir/orkanX.png")
    };
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
    return (
      <Image style={{ width: 80, height: 70 }} source={this.images[name]} />
    );
  };
  displayFuel = item => {
    if (this.state.fuel == "bensin") {
      if (item.bensin95_discount != null) {
        return (
          <View>
            <Text style={styles.price}>Bensín verð: {item.bensin95}</Text>
            <Text style={styles.discount}>
              (með afslætti: {item.bensin95_discount})
            </Text>
          </View>
        );
      }
      return (
        <View>
          <Text style={styles.price}>Bensín verð: {item.bensin95}</Text>
        </View>
      );
    }
    if (this.state.fuel == "disel") {
      if (item.diesel_discount != null) {
        return (
          <View>
            <Text style={styles.price}>Dísel verð: {item.diesel}</Text>
            <Text style={styles.discount}>
              (með afslætti: {item.diesel_discount})
            </Text>
          </View>
        );
      }
      return (
        <View>
          <Text style={styles.price}>Dísel verð: {item.diesel}</Text>
        </View>
      );
    }
  };
  changeFuel = check => {
    if (check) {
      this.setState({ fuel: "bensin" });
    } else if (!check) {
      this.setState({ fuel: "disel" });
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
            <SegmentButton changeFuel={check => this.changeFuel(check)} />
          }
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={styles.itemBox}>
              {this.displayImage(item.company)}
              <View style={styles.dist}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.distance}>distance: unknown</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.company}>{item.company}</Text>
                {this.displayFuel(item)}
              </View>
            </View>
          )}
          keyExtractor={(item, index) => item.key}
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
    padding: 8,
    flexDirection: "row"
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
    textAlign: "right",
    fontSize: 12,
    paddingRight: 5
  },
  name: {
    paddingLeft: 5,
    fontSize: 14,
    fontStyle: "italic"
  },
  info: {
    flex: 1
  },
  price: {
    textAlign: "right",
    fontSize: 12,
    paddingRight: 5
  },
  discount: {
    textAlign: "right",
    paddingRight: 5,

    fontSize: 10,
    color: "grey"
  },
  dist: {
    flexDirection: "column",
    width: 195
  },
  distance: {
    paddingLeft: 5,
    fontSize: 11,
    textDecorationLine: "underline"
  }
});
