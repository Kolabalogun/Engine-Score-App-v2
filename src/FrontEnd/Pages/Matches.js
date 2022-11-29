import {
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";

import React from "react";

import { useGlobalContext } from "../../Function/Context";

import { StatusBar } from "expo-status-bar";
import Header from "../Components/Others/Header";
import Nav from "../Components/Others/Nav";
import Loader from "../Components/Others/Loader";

const Match = ({ navigation }) => {
  const { MatchsFromDB, getMatchsFromDB, competition, loader } =
    useGlobalContext();

  const Engine40list = MatchsFromDB.map((match, index) => {
    if (match.Competition === "Engine 4.0") {
      return (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate("MatchResult", {
              matchId: match.id,
            })
          }
          style={styles.eachMatch}
        >
          <View style={styles.eachMatchTeam}>
            <Text style={styles.eachMatchTeamTxt}>{match.HomeTeam}</Text>

            <Image
              source={require("../../../assets/logo-01.png")}
              resizeMode="contain"
              style={{ height: 45, width: 45 }}
            />
          </View>
          <View style={styles.eachMatchTime}>
            {match.MatchActive ? (
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.eachMatchTeamTimeScore}>
                  {match.HomeTeamScore}
                </Text>
                <Text style={styles.eachMatchTeamDateScore}>-</Text>
                <Text style={styles.eachMatchTeamTimeScore}>
                  {match.AwayTeamScore}
                </Text>
              </View>
            ) : (
              <>
                <Text style={styles.eachMatchTeamTime}>{match.Matchtime}</Text>
                <Text style={styles.eachMatchTeamDate}>{match.MatchDate}</Text>
              </>
            )}
          </View>
          <View style={styles.eachMatchTeam}>
            <Image
              source={require("../../../assets/logo-02.png")}
              resizeMode="contain"
              style={{ height: 45, width: 45 }}
            />

            <Text style={styles.eachMatchTeamTxt}>{match.AwayTeam}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  });
  const Engine30list = MatchsFromDB.map((match, index) => {
    if (match.Competition === "Engine 3.0") {
      return (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate("MatchResult", {
              matchId: match.id,
            })
          }
          style={styles.eachMatch}
        >
          <View style={styles.eachMatchTeam}>
            <Text style={styles.eachMatchTeamTxt}>{match.HomeTeam}</Text>

            <Image
              source={require("../../../assets/logo-01.png")}
              resizeMode="contain"
              style={{ height: 45, width: 45 }}
            />
          </View>
          <View style={styles.eachMatchTime}>
            <Text style={styles.eachMatchTeamTime}>{match.Matchtime}</Text>
            <Text style={styles.eachMatchTeamDate}>{match.MatchDate}</Text>
          </View>
          <View style={styles.eachMatchTeam}>
            <Image
              source={require("../../../assets/logo-02.png")}
              resizeMode="contain"
              style={{ height: 45, width: 45 }}
            />

            <Text style={styles.eachMatchTeamTxt}>{match.AwayTeam}</Text>
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

    getMatchsFromDB();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.main}> */}
        <Header navigation={navigation} />

        <Nav />

        {loader ? (
          <Loader />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
          >
            <View>
              <Text style={styles.dashboardTitle}>Match</Text>

              {competition === 4 ? Engine40list : Engine30list}
            </View>
          </ScrollView>
        )}
      {/* </View> */}
    </SafeAreaView>
  );
};

export default Match;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edeff2",
    paddingHorizontal: 15,
    paddingTop: 15,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
  },

  homeHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "400",
  },

  headerTitleScore: {
    color: "#ff2782",
    fontWeight: "500",
  },

  navMenu: {
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dashboard: {
    marginBottom: 10,
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: "500",
  },

  dashboardBox: {
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "rgb(85, 3, 85)",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: "500",
  },

  competitionName: {
    color: "white",
    fontSize: 14,
    marginBottom: 5,
  },
  matchDay: {
    fontSize: 13,
    color: "#aaa",
  },

  scoreBoard: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teamBoard: {
    fontSize: 18,
    fontWeight: "500",
    alignItems: "center",
  },

  score: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    color: "white",
  },

  teamTxt: {
    color: "white",
    paddingTop: 5,
  },

  scoreTxt: {
    color: "white",
    fontSize: 48,
  },

  eachMatch: {
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 5,
    borderWidth: 3,

    alignItems: "center",

    borderColor: "rgba(209, 225, 240, 0.782)",
  },

  eachMatchTeam: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
