import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Header from "../Components/Others/Header";



const Credits = ({navigation}) => {

    
function functions(params) {
  navigation.goBack();
}
  return (
    <ScrollView style={styles.container}>
      <Header functions={functions} />
      <View style={styles.body}>
        <View style={styles.noth}>
          <TouchableOpacity
            onLongPress={() => navigation.navigate("AuthNavigations")}
          >
            <Image
              resizeMode="contain"
              source={require("../../../assets/credit.png")}
              style={{ width: 300, height: 300, borderRadius: 15 }}
            />
          </TouchableOpacity>
          <Text style={styles.nothTxt}>This app is developed by Ibrahim.</Text>
          <TouchableOpacity
            style={styles.optionBtn}
            onPress={() => {
              Linking.openURL("https://ibrahimkolabalogun.web.app/");
            }}
          >
            <Text style={styles.option}>See Portfolio</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Credits;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

    height: "100%",
    backgroundColor: "aliceblue",
    paddingHorizontal: 10,
  },
  body: {
    paddingHorizontal: 20,

    marginVertical: 30,
    flex: 1,
  },
  optionBtn: {
    padding: 10,
    marginVertical: 15,
    justifyContent: "space-between",

    borderColor: "rgb(235, 148, 129)",
    borderWidth: 2,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  option: {
    fontSize: 20,
    fontWeight: "500",
    color: "black",
    paddingHorizontal: 10,
  },

  noth: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nothTxt: {
    fontSize: 19,
    fontWeight: "500",
    textAlign: "center",
    fontStyle: "italic",
    marginVertical: 20,
  },
});
