import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";

import { Platform, StatusBar, StyleSheet} from "react-native";
import Index from "./src/Backend/Index";
import Header from "./src/FrontEnd/Components/Others/Header";
import Modal from "./src/FrontEnd/Home/Modal";
import Group from "./src/FrontEnd/Pages/Group";
import Match from "./src/FrontEnd/Pages/Home";
import { AppProvider } from "./src/Function/Context";
import Navigations from "./src/Function/Navigation";




const stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [ModalState, ModalStateF] = useState(true);

  function closeModal() {
    ModalStateF(false);
  }

  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 3000);
  });

  return (
    <NavigationContainer style={styles.container}>
    <AppProvider>
      {ModalState ? (
        <Modal />
      ) : (
       
      
 <Navigations/>
       
      )}
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
