// import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import AddTeams from "../Backend/AddTeams";
import CreateMatch from "../Backend/CreateMatch";
import EditTeams from "../Backend/EditTeams";
import MatchInfo from "../Backend/MatchInfo";
import TeamStart from "../Backend/TeamStart";
// import Drawerr from "../FrontEnd/Pages/Drawer";
import DrawerNavigation from "./DrawerNavigation";
import * as Notifications from 'expo-notifications';
import TabNavigations from "./TabNavigation";
import { useEffect, useRef } from "react";
import { useNotification } from "./useNotification";



const Stack = createNativeStackNavigator();



const Navigations = () => {


  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"DrawerNavigation"}
    >
      {/* <Stack.Screen name="Tabs" component={TabNavigations} /> */}
      <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
      <Stack.Screen name="EditTeams" component={EditTeams} />
      <Stack.Screen name="Add Teams" component={AddTeams} />
      <Stack.Screen name="Create Match" component={CreateMatch} />
      <Stack.Screen name="MatchInfo" component={MatchInfo} />
      <Stack.Screen name="TeamStat" component={TeamStart} />
      
    </Stack.Navigator>
  );
};

export default Navigations;

const styles = StyleSheet.create({});
