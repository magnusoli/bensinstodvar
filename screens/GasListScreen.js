import React from "react";
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Image
} from "react-native";
import { connect } from "react-redux";

import SegmentButton from "../components/SegmentButton";
import { updateData, updateLocation } from "../reduxStore";

class GasListScreen extends React.Component {
  static navigationOptions = () => {
    return { title: "Listi" };
  };
  constructor(props) {
    super(props);
    this.state = {
      fuel: "bensin95",
      sort: null
    };
    this.images = {
      N1: require("../listpictures/n1.png"),
      Dælan: require("../listpictures/dælan.png"),
      "Costco Iceland": require("../listpictures/costcoiceland.png"),
      Atlantsolía: require("../listpictures/atlantsolía.png"),
      ÓB: require("../listpictures/ób.png"),
      Olís: require("../listpictures/olís.png"),
      Orkan: require("../listpictures/orkan.png"),
      "Orkan X": require("../listpictures/orkanX.png")
    };
  }

  componentDidMount() {
    this.props.updateData();
    this.props.updateLocation();
  }
  displayImage = name => {
    return (
      <Image style={{ width: 80, height: 70 }} source={this.images[name]} />
    );
  };
  displaySort = data => {
    if (this.state.sort == null) {
      return data;
    }
    if (this.state.sort) {
      return null;
    } else {
      return data.sort((a, b) => a[this.state.fuel] - b[this.state.fuel]);
    }
  };
  displayFuel = item => {
    return (
      <View>
        <Text style={styles.price}>
          {this.state.fuel == "bensin95" ? "Bensín" : "Dísel"} verð:{" "}
          {item[this.state.fuel]}
        </Text>
        {item[`${this.state.fuel}_discount`] == null ? null : (
          <Text style={styles.discount}>
            (með afslætti: {item[`${this.state.fuel}_discount`]})
          </Text>
        )}
      </View>
    );
  };

  changeFuel = check => {
    if (check) {
      this.setState({ fuel: "bensin95" });
    } else if (!check) {
      this.setState({ fuel: "diesel" });
    }
  };
  changeSort = check => {
    this.setState({ sort: check });
  };
  distanceCalculator = (lat1, lon1, lat2, lon2) => {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = (dist * 1.609344).toFixed(3);
    if (dist < 1) {
      return `${dist * 1000} m`;
    } else {
      return `${dist} km`;
    }
  };
  render() {
    const { fetching, error } = this.props;
    if (fetching) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    if (error != undefined)
      return (
        <View style={styles.container}>
          <Text>{error}</Text>
        </View>
      );
    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <SegmentButton
              changeFuel={check => this.changeFuel(check)}
              changeSort={check => this.changeSort(check)}
            />
          }
          data={this.displaySort(this.props.data)}
          renderItem={({ item }) => (
            <View style={styles.itemBox}>
              {this.displayImage(item.company)}
              <View style={styles.dist}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.distance}>
                  distance:{" "}
                  {this.distanceCalculator(
                    item.geo.lat,
                    item.geo.lon,
                    this.props.position.lat,
                    this.props.position.lon
                  )}
                </Text>
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

const mapStateToProps = state => {
  return { ...state };
};

export default connect(
  mapStateToProps,
  { updateData, updateLocation }
)(GasListScreen);
