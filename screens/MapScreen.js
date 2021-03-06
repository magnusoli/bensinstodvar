import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView from "react-native-maps";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATTITUDE_DELTA = 0.08;
const LONGTITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO;
class MapScreen extends React.Component {
  static navigationOptions = () => {
    return { title: "Bensínstöðvar App" };
  };
  constructor(props) {
    super(props);
    this.state = {
      initialPosition: {
        latitude: this.props.position.lat,
        longitude: this.props.position.lon,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA
      }
    };
    this.images = {
      N1: require("../mappictures/n1.png"),
      Dælan: require("../mappictures/dælan.png"),
      "Costco Iceland": require("../mappictures/costcoiceland.png"),
      Atlantsolía: require("../mappictures/atlantsolía.png"),
      ÓB: require("../mappictures/ób.png"),
      Olís: require("../mappictures/olís.png"),
      Orkan: require("../mappictures/orkan.png"),
      "Orkan X": require("../mappictures/orkanX.png")
    };
  }
  render() {
    const { initialPosition } = this.state;

    return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={initialPosition}>
          {this.props.data.map(marker => (
            <MapView.Marker
              image={this.images[marker.company]}
              anchor={{ x: 0.5, y: 0.5 }}
              key={marker.key}
              coordinate={{
                latitude: marker.geo.lat,
                longitude: marker.geo.lon
              }}
              title={marker.company + ", " + marker.name}
            />
          ))}
          <MapView.Marker
            coordinate={{
              latitude: initialPosition.latitude,
              longitude: initialPosition.longitude
            }}
            title={"Your Location"}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View style={styles.radius}>
              <View style={styles.marker} />
            </View>
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  radius: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    overflow: "hidden",
    backgroundColor: "rgba(0,122,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(0,122,255,0.3)",
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    borderWidth: 3,
    borderColor: "white",
    overflow: "hidden",
    backgroundColor: "#007AFF"
  },
  img: {
    height: 30,
    width: 30,
    borderRadius: 20 / 2,
    borderWidth: 3,
    backgroundColor: "#FFFF",
    overflow: "hidden"
  },

  container: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps)(MapScreen);
