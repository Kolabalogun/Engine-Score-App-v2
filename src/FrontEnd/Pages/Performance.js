import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useGlobalContext } from "../../Function/Context";
// import Performancelist from "../Components/Performance/Performancelist";
import { StatusBar } from "expo-status-bar";
import Header from "../Components/Others/Header";
import { useState } from "react";

const Performance = ({ navigation }) => {
  const { Group } = useGlobalContext();

  const [competition, competitionF] = useState(4);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Header navigation={navigation} />

        <View style={styles.navMenu}>
          <TouchableOpacity
            onPress={() => {
              competitionF(4);
            }}
            style={{
              backgroundColor: competition === 4 ? "#ff2782" : "#fff",
              paddingHorizontal: 10,
              paddingVertical: 15,
              flex: 1,
              marginHorizontal: 5,
              alignItems: "center",
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: competition === 4 ? "#fff" : "#ff2782",
                fontWeight: "500",
                fontSize: 15,
              }}
            >
              Engine 4.0
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              competitionF(3);
            }}
            style={{
              backgroundColor: competition === 3 ? "#ff2782" : "#fff",
              paddingHorizontal: 10,
              paddingVertical: 15,
              flex: 1,
              marginHorizontal: 5,
              alignItems: "center",
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: competition === 3 ? "#fff" : "#ff2782",
                fontWeight: "500",
                fontSize: 15,
              }}
            >
              Engine 3.0
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.group}>
            <Text style={styles.groupName}>Goals</Text>
            <View style={styles.table}>
              <View style={styles.topTable}>
                <TouchableOpacity style={styles.eachMatch}>
                  <View style={styles.eachMatchTeam}>
                    <Image
                      source={require("../../../assets/logo-01.png")}
                      resizeMode="contain"
                      style={{ height: 45, width: 45 }}
                    />

                    <Text style={styles.eachMatchTeamTxt}>Player 1</Text>
                  </View>

                  <View style={styles.eachMatchTeam}>
                    <Text style={styles.eachMatchTeamTxt}>5</Text>
                  </View>
                </TouchableOpacity>
              </View>
              {/* {Group1Elements} */}
            </View>
          </View>
          <View style={styles.group}>
            <Text style={styles.groupName}>Assists</Text>
            <View style={styles.table}>
              <View style={styles.topTable}></View>
              {/* {Group2Elements} */}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Performance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edeff2",
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
  },
  main: {
    paddingTop: 15,
  },

  navMenu: {
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  Performance: {
    padding: 0,
    marginBottom: 30,
  },

  PerformanceName: {
    fontSize: 16,
    fontWeight: "500",
    paddingTop: 3,
    paddingBottom: 3,
    borderTopWidth: 1,
    borderTopColor: "#aaa",
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    color: "black",
    marginBottom: 10,
    marginTop: 5,
  },

  table: {
    display: "flex",
    flexDirection: "column",
    color: "#aaa",
    paddingTop: 10,
    alignItems: "center",
  },
  topTable: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },

  tableHead: {
    color: "black",
    fontWeight: "500",
  },
  titleText: {
    fontSize: 15,
    fontWeight: "600",
    // marginBottom: 10,
  },

  group: {
    padding: 0,
    marginBottom: 30,
  },

  groupName: {
    fontSize: 16,
    fontWeight: "500",
    paddingTop: 3,
    paddingBottom: 3,
    borderTopWidth: 1,
    borderTopColor: "#aaa",
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    color: "black",
    // marginBottom: 10,
    marginTop: 5,
  },

  table: {
    display: "flex",
    flexDirection: "column",
    color: "#aaa",
    paddingTop: 10,
    alignItems: "center",
  },
  topTable: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },

  tableHead: {
    color: "black",
    fontWeight: "500",
  },
  tableHeadOne: {
    color: "black",
    fontWeight: "500",
    width: 65,
  },
  titleText: {
    fontSize: 15,
    fontWeight: "600",
    // marginBottom: 10,
  },

  eachMatch: {
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,

    borderWidth: 3,
    marginBottom: 5,
    alignItems: "center",

    borderColor: "rgba(209, 225, 240, 0.782)",
    flex: 1,
  },

  eachMatchTeam: {
    //  flex:1,
    flexDirection: "row",
    //  justifyContent: 'space-between',
    color: "white",
    alignItems: "center",
  },

  eachMatchTime: {
    flex: 1,
    alignItems: "center",
  },

  eachMatchTeamTxt: {
    fontWeight: "500",
  },

  eachMatchTeamTime: {
    color: "red",
    fontWeight: "500",
  },

  eachMatchTeamDate: {
    color: "#aaa",
    fontWeight: "400",
  },

  eachMatchTeamTimeScore: {
    color: "red",
    fontWeight: "500",
    fontSize: 17,
  },

  eachMatchTeamDateScore: {
    color: "#aaa",
    fontWeight: "400",
    fontSize: 20,
    paddingHorizontal: 8,
  },
});
