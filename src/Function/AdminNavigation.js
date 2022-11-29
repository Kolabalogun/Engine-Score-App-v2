import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Home from "../FrontEnd/Pages/Home";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Group from "../FrontEnd/Pages/Group";
import Match from "../FrontEnd/Pages/Matches";
import Performance from "../FrontEnd/Pages/Performance";
import TopPick from "../Backend/Top Pick/TopPick";
import ListofTeams from "../Backend/Team/ListofTeams";
import MatchList from "../Backend/Match/MatchList";
import Players from "../Backend/Player/Players";
import ListofPlayers from "../Backend/Player/ListofPlayers";

const Tabs = createMaterialBottomTabNavigator();

const AdminNavigation = () => {
  return (
    <Tabs.Navigator
      barStyle={{ backgroundColor: "#fff" }}
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === "Top Pick") {
            iconName = "home";
            (size = focused ? 23 : 22),
              (color = focused ? "#ff2782" : "#cdd4dc");
          } else if (route.name === "Team List") {
            iconName = "list-alt";
            (size = focused ? 23 : 22),
              (color = focused ? "#ff2782" : "#cdd4dc");
          } else if (route.name === "ListofPlayers") {
            iconName = "group";
            (size = focused ? 23 : 22),
              (color = focused ? "#ff2782" : "#cdd4dc");
          } else if (route.name === "MatchList") {
            iconName = "calendar-o";
            (size = focused ? 23 : 22),
              (color = focused ? "#ff2782" : "#cdd4dc");
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },

        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tabs.Screen name="Top Pick" component={TopPick} />
      <Tabs.Screen name="Team List" component={ListofTeams} />
      <Tabs.Screen name="MatchList" component={MatchList} />
      <Tabs.Screen name="ListofPlayers" component={ListofPlayers} />
    </Tabs.Navigator>
  );
};

export default AdminNavigation;

const styles = StyleSheet.create({});
