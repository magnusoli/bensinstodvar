import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import MapScreen from "../screens/MapScreen";
import GasListScreen from "../screens/GasListScreen";

const MapStack = createStackNavigator({
  Map: MapScreen
});

MapStack.navigationOptions = {
  title: "Map",
  tabBarLabel: "Kort",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios" ? `ios-map${focused ? "" : "-outline"}` : "md-map"
      }
    />
  )
};

const GasListStack = createStackNavigator({
  GasList: GasListScreen
});

GasListStack.navigationOptions = {
  title: "List",

  tabBarLabel: "Listi",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-list${focused ? "" : "-outline"}`
          : "md-list"
      }
    />
  )
};

export default createBottomTabNavigator({
  GasListStack,
  MapStack
});
