// import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
// import Drawerr from "../FrontEnd/Pages/Drawer";
import DrawerNavigation from "./DrawerNavigation";
// import Drawer from "../FrontEnd/Pages/Drawer";
import TabNavigations from "./TabNavigation";



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
      
    </Stack.Navigator>
  );
};

export default Navigations;

const styles = StyleSheet.create({});
