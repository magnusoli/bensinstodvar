import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Image
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const { width, height } = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATTITUDE_DELTA = 0.08;
const LONGTITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO;
export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPosition: {
        latitude: null,
        longitude: null,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA
      },
      isLoading: true,
      isLoading2: true
    };
    this.images = { 
      N1: require("../myndir/n1.png"), 
      Dælan: require("../myndir/dælan.png"), 
      "Costco Iceland": require("../myndir/costcoiceland.png"), 
      Atlantsolía: require("../myndir/atlantsolía.png"), 
      ÓB: require("../myndir/ób.png"), 
      Olís: require("../myndir/olís.png"), 
      Orkan: require("../myndir/orkan.png"), 
      "Orkan X": require("../myndir/orkanX.png") };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.setState({
          initialPosition: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            latitudeDelta: LATTITUDE_DELTA,
            longitudeDelta: LONGTITUDE_DELTA
          },
          isLoading2: false
        });
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

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

  render() {
    if (this.state.isLoading || this.state.isLoading2) {
      return (
        <View style={{ flex: 1, padding: 20, alignContent: "center" }}>
          <ActivityIndicator />
        </View>
      );
    }
    return <View style={styles.container}>
        <MapView style={styles.map} initialRegion={this.state.initialPosition}>
          {this.state.dataSource.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={{
                latitude: marker.geo.lat,
                longitude: marker.geo.lon
              }}
              title={marker.company + ", " + marker.name}
            >
              <View style={styles.img}>
                <Image
                  style={{ width: 24, height: 24 }}
                  source={this.images[marker.company]}
                />
              </View>
            </MapView.Marker>
          ))}
          <MapView.Marker coordinate={{ latitude: this.state.initialPosition.latitude, longitude: this.state.initialPosition.longitude }} title={"Your Location"}>
            <View style={styles.radius}>
              <View style={styles.marker} />
            </View>
          </MapView.Marker>
        </MapView>
      </View>;
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
