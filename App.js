import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useEffect, useState } from "react";

import { Platform, StatusBar, StyleSheet} from "react-native";
import Loader from "./src/FrontEnd/Components/Others/Loader";

import Modal from "./src/FrontEnd/Home/Modal";

import { AppProvider } from "./src/Function/Context";
import Navigations from "./src/Function/Navigation";




export default function App() {
  const { loader } = useState(true);



  return (
    <NavigationContainer style={styles.container}>
    <AppProvider>

{
  
}
   
 <Navigations/>
  <StatusBar style="auto" />

    </AppProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
  },
});
