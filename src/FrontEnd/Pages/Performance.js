import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import React, { useEffect } from "react";
import { useGlobalContext } from "../../Function/Context";
import { StatusBar } from "expo-status-bar";
import Header from "../Components/Others/Header";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Utils/Firebase";
import Loader from "../Components/Others/Loader";
import Nav from "../Components/Others/Nav";

const Performance = ({ navigation }) => {
  const { competitionType, competitionTypeF, competition, competitionF, loader, loaderF } =
    useGlobalContext();

  const [PlayerDataFromDB, PlayerDataFromDBF] = useState([]);

  useEffect(() => {
    getBlogDetail();
  }, []);

  const getBlogDetail = async () => {
loaderF(true)
    const docRef = doc(db, "Player Data", "WmVhSufxYzBSkL8HsqkF");
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      PlayerDataFromDBF([...snapshot.data().playerDatas]);
    }
    loaderF(false)
  };

  const goalsRanking = PlayerDataFromDB;
  goalsRanking.sort(function (a, b) {
    return b.Goals - a.Goals;
  });

  const GoalsGroup = goalsRanking.slice(0, 5).map((goal, index) => {
    if (goal.Competition === competitionType) {
      return (
        <TouchableOpacity key={index} style={styles.eachMatch}>
          <View style={styles.eachMatchTeam}>
            <Image
              source={require("../../../assets/logo-01.png")}
              resizeMode="contain"
              style={{ height: 45, width: 45 }}
            />
            <View>
              <Text style={styles.eachMatchTeamTxt}>{goal.PlayerName}</Text>
              <Text style={{ color: "#aaa" }}>{goal.TeamNameSelect}</Text>
            </View>
          </View>

          <View style={styles.eachMatchTeam}>
            <Text style={styles.eachMatchTeamTxt}>{goal.Goals}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  });

  const AssistsRanking = PlayerDataFromDB;
  AssistsRanking.sort(function (a, b) {
    return b.Assists - a.Assists;
  });

  const AssistsGroup = AssistsRanking.slice(0, 6).map((goal, index) => {
    if (goal.Competition === competitionType) {
      return (
        <TouchableOpacity key={index} style={styles.eachMatch}>
          <View style={styles.eachMatchTeam}>
            <Image
              source={require("../../../assets/logo-01.png")}
              resizeMode="contain"
              style={{ height: 45, width: 45 }}
            />
            <View style={{}}>
              <Text style={styles.eachMatchTeamTxt}>{goal.PlayerName}</Text>
              <Text style={{ color: "#aaa" }}>{goal.TeamNameSelect}</Text>
            </View>
          </View>

          <View style={styles.eachMatchTeam}>
            <Text style={styles.eachMatchTeamTxt}>{goal.Assists}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  });

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getBlogDetail();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Header navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={["#ff2782"]}
        
              onRefresh={onRefresh}
            />
          }
        >
          <Nav />

          {loader ? (
            <Loader />
          ) : (
            <>
              <View style={styles.group}>
                <Text style={styles.groupName}>Goals</Text>
                <View style={styles.table}>{GoalsGroup}</View>
              </View>
              <View style={styles.group}>
                <Text style={styles.groupName}>Assists</Text>
                <View style={styles.table}>{AssistsGroup}</View>
              </View>
            </>
          )}
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
  },

  eachMatchTeam: {
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
    fontSize: 16,
  },

  eachMatchTeamTime: {
    color: "red",
    fontWeight: "500",
  },

 

 

});
