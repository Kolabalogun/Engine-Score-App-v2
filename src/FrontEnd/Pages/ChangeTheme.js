import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useGlobalContext } from "../../Function/Context";
import SelectDropdown from "react-native-select-dropdown";
import Loader from "../Components/Others/Loader";

const ChangeTheme = ({ navigation }) => {
  const { notification, loader, storeTheme, currentTheme, currentThemeF } =
    useGlobalContext();

  function Headers({ functions, imgtype }) {
    return (
      <View style={styles.homeHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
          style={styles.profilePic}
        >
          <Image
            source={require("../../../assets/home.png")}
            resizeMode="cover"
            style={{ height: 28, width: 28 }}
          />
        </TouchableOpacity>
        <View style={styles.headerTitleDiv}>
          <Text style={styles.headerTitle}>
            Engine <Text style={styles.headerTitleScore}>Scores</Text>
          </Text>
        </View>
        <TouchableOpacity onPress={functions} style={styles.profilePic}>
          <Image
            source={imgtype}
            resizeMode="cover"
            style={{ height: 30, width: 30 }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  const themeArray = ["Default", "Purple","Red", "Pink" ];

  const [selectedTheme, selectedThemeF]= useState('')

  function handleSubmit() {
    storeTheme(selectedTheme)
    currentThemeF(selectedTheme)
    navigation.navigate('Home')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Headers />

      {loader ? (
        <Loader />
      ) : (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <View style={{ marginTop: 10 }}>
            <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Select Themes
            </Text>

            <SelectDropdown
                data={themeArray}
              defaultButtonText={"Select Theme"}
              buttonStyle={styles.dropdownStyle}
              buttonTextStyle={styles.dropdownStyleTxt}
              onSelect={(selectedItem, index) => {
                selectedThemeF(selectedItem);
              }}
            />
          </View>

          <Text style={{ color: "red", alignSelf: "center", padding: 3 }}>
            {notification}
          </Text>

          <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.btnTxt}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ChangeTheme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edeff2",
    paddingHorizontal: 15,
    paddingTop: 15,
  },

  homeHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "edeff2",
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "400",
  },

  headerTitleScore: {
    color: "#ff2782",
    fontWeight: "500",
  },
  dropdownStyle: {
    width: "100%",
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 13,
    borderColor: "#aaa",
    backgroundColor: "white",
    height: 40,
  },
  dropdownStyleTxt: {
    fontSize: 14,
  },
  btn: {
    paddingVertical: 12,
    backgroundColor: "#ff2782",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "100%",
    marginVertical: 20,
    marginBottom: 50,
  },
  btnTxt: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
