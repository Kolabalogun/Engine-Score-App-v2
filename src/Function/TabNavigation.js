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




const Tabs = createMaterialBottomTabNavigator ();

const TabNavigations = () => {
  return (
    <Tabs.Navigator
    barStyle={{ backgroundColor: '#fff' }}
    initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
            (size = focused ? 23 : 20),
              (color = focused ? "#ff2782" : "#cdd4dc");
          }
           else if (route.name === "Match") {
            iconName = "calendar-o";
            (size = focused ? 23 : 20),
              (color = focused ? "#ff2782" : "#cdd4dc");
          }
           else if (route.name === "Group") {
            iconName = "soccer-ball-o";
            (size = focused ? 23 : 20),
              (color = focused ? "#ff2782" : "#cdd4dc");
          }
           else if (route.name === "Stat") {
             iconName = "user";
             (size = focused ? 23 : 20),
               (color = focused ? "#ff2782" : "#cdd4dc");
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
