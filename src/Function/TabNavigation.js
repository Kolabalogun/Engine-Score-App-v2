import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Home from "../FrontEnd/Pages/Home";
import Notification from "../Notification/Notification";
// import Index from "../Group/Index";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Group from "../FrontEnd/Pages/Group";
import Match from "../FrontEnd/Pages/Matches";
import Performance from "../FrontEnd/Pages/Performance";
import { useGlobalContext } from "./Context";

const Tabs = createMaterialBottomTabNavigator();

const TabNavigations = () => {
  const { currentTheme } = useGlobalContext();

  return (
    <Tabs.Navigator
      barStyle={{
        backgroundColor:
          currentTheme === "Red"
            ? "#CF0A0A"
            : currentTheme === "Pink"
            ? "#EA047E"
            : currentTheme === "Purple"
            ? "#fff"
            : "#377D71",
      }}
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === "Home") {
            <FontAwesome name={"home"} size={size} color={color} />;
            iconName = "home";
            (size = focused ? 26 : 26),
              (color =
                focused && currentTheme === "Red"
                  ? "#000"
                  : !focused && currentTheme === "Purple"
                  ? "rgb(171, 181, 190)"
                  : focused && currentTheme === "Pink"
                  ? "#496EEC"
                  : focused && currentTheme === "Purple"
                  ? "#EA047E"
                  : focused && currentTheme === "Default"
                  ? "#000"
                  : "#fff");
          } else if (route.name === "Match") {
            iconName = "soccer-ball-o";
            (size = focused ? 23 : 23),
              (color =
                focused && currentTheme === "Red"
                  ? "#000"
                  : !focused && currentTheme === "Purple"
                  ? "rgb(171, 181, 190)"
                  : focused && currentTheme === "Pink"
                  ? "#496EEC"
                  : focused && currentTheme === "Purple"
                  ? "#EA047E"
                  : focused && currentTheme === "Default"
                  ? "#000"
                  : "#fff");
          } else if (route.name === "Group") {
            iconName = "group";
            (size = focused ? 23 : 23),
              (color =
                focused && currentTheme === "Red"
                  ? "#000"
                  : !focused && currentTheme === "Purple"
                  ? "rgb(171, 181, 190)"
                  : focused && currentTheme === "Pink"
                  ? "#496EEC"
                  : focused && currentTheme === "Purple"
                  ? "#EA047E"
                  : focused && currentTheme === "Default"
                  ? "#000"
                  : "#fff");
          } else if (route.name === "Stat") {
            iconName = "list-alt";
            (size = focused ? 23 : 23),
              (color =
                focused && currentTheme === "Red"
                  ? "#000"
                  : !focused && currentTheme === "Purple"
                  ? "rgb(171, 181, 190)"
                  : focused && currentTheme === "Pink"
                  ? "#496EEC"
                  : focused && currentTheme === "Purple"
                  ? "#EA047E"
                  : focused && currentTheme === "Default"
                  ? "#000"
                  : "#fff");
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },

        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Match" component={Match} />
      <Tabs.Screen name="Group" component={Group} />
      <Tabs.Screen name="Stat" component={Performance} />
    </Tabs.Navigator>
  );
};

export default TabNavigations;

const styles = StyleSheet.create({});
