import React from "react";
import { StyleSheet, View, Dimensions, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";

const { width, height } = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATTITUDE_DELTA = 0.08;
const LONGTITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO;
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPosition: {
        latitude: 64.128288,
        longitude: -21.827774,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA
      },
      isLoading: true
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
        <MapView style={styles.map} initialRegion={this.state.initialPosition}>
          {this.state.dataSource.map(marker => (
            <MapView.Marker
              coordinate={{
                latitude: marker.geo.lat,
                longitude: marker.geo.lon
              }}
              title={marker.company + ", " + marker.name}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
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
