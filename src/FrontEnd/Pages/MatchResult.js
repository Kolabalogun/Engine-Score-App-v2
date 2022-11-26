import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  RefreshControl,
} from "react-native";
import React, { useEffect } from "react";
import { useGlobalContext } from "../../Function/Context";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Utils/Firebase";
import Loader from "../Components/Others/Loader";

const initialState = {
  Competition: "",

  MatchDay: "",
  HomeTeam: "",
  HomeTeamFormation: "",
  MatchDate: "",
  AwayTeam: "",
  AwayTeamFormation: "",
  Matchtime: "",
  HomeTeamScore: 0,
  AwayTeamScore: 0,
  MatchTimeline: "",
  MatchActive: false,
};
const MatchResult = ({ route, navigation }) => {
  const { TeamsFromDB, getTeamsFromDB, loader } = useGlobalContext();

  const { matchId } = route.params;

  const [matchhInfo, matchhInfoF] = useState(initialState);

  useEffect(() => {
    matchId && getBlogDetail();
  }, [matchId]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "Matchs", matchId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      matchhInfoF({ ...snapshot.data() });
    }
  };

  const {
    Competition,
    HomeTeam,
    HomeTeamFormation,
    MatchDate,
    AwayTeam,
    AwayTeamFormation,
    Matchtime,
    HomeTeamScore,
    AwayTeamScore,
    MatchTimeline,
    MatchActive,
    MatchDay,
  } = matchhInfo;

  const [HomeTeamData, HomeTeamDataF] = useState([]);
  const [AwayTeamData, AwayTeamDataF] = useState([]);

  useEffect(() => {
    const data = TeamsFromDB.filter(
      (team) =>
        team.Competition === Competition && team.TeamName === HomeTeam
    );

    HomeTeamDataF(data);
  }, [Competition, TeamsFromDB]);
  useEffect(() => {
    const data = TeamsFromDB.filter(
      (team) =>
        team.Competition === Competition && team.TeamName === AwayTeam
    );
    AwayTeamDataF(data);
  }, [Competition, TeamsFromDB]);

  const [activeMenu, activeMenuF] = useState("lineup");



    const wait = (timeout) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    };


 const [refreshing, setRefreshing] = React.useState(false);

 const onRefresh = React.useCallback(() => {
   setRefreshing(true);
   getTeamsFromDB()
   getBlogDetail();
   wait(2000).then(() => setRefreshing(false));
 }, []);



  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.matchTopBar}>
        <View style={styles.homeHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: "aliceblue",
              opacity: 1,
              borderRadius: 50,
            }}
          >
            <Image
              source={require("../../../assets/ba.png")}
              resizeMode="cover"
              style={{ height: 30, width: 30 }}
            />
          </TouchableOpacity>
          <View style={styles.headerTitleDiv}>
            <Text style={styles.headerTitle}>{Competition}</Text>
          </View>
          <TouchableOpacity style={{ borderRadius: 50 }}>
            {/* <Image
              source={require("../../../assets/refresh.png")}
              resizeMode="cover"
              style={{ height: 25, width: 25 }}
            /> */}
          </TouchableOpacity>
        </View>
      </View>

      {loader ? (
        <Loader />
      ) : (
        <>
          <View style={styles.dashboard}>
            <View style={styles.dashboardBox}>
              <Text style={styles.competitionName}>Maracana Field</Text>
              <Text style={styles.matchDay}>Matchday {MatchDay}</Text>

              <View style={styles.scoreBoard}>
                <View style={styles.teamBoard}>
                  <Image
                    source={require("../../../assets/logo-01.png")}
                    resizeMode="contain"
                    style={{ height: 90, width: 90 }}
                  />

                  <Text style={styles.teamTxt}>{HomeTeam}</Text>
                </View>
                <View style={styles.score}>
                  {MatchActive ? (
                    <>
                      <Text style={styles.scoreTxt}>{HomeTeamScore}</Text>
                      <Text style={styles.scoreTxt}>:</Text>
                      <Text style={styles.scoreTxt}>{AwayTeamScore}</Text>
                    </>
                  ) : (
                    <View
                      style={{
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                      }}
                    >
                      <Text style={styles.eachMatchTeamTime}>{Matchtime}</Text>
                      <Text
                        style={{
                          color: "black",
                          fontWeight: "500",
                          fontSize: 15,
                        }}
                      >
                        {"vs"}
                      </Text>
                      <Text style={styles.eachMatchTeamDate}>{MatchDate}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.teamBoard}>
                  <Image
                    source={require("../../../assets/logo-02.png")}
                    resizeMode="contain"
                    style={{ height: 90, width: 90 }}
                  />

                  <Text style={styles.teamTxt}>{AwayTeam}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.navMenu}>
            <TouchableOpacity
              onPress={() => {
                activeMenuF("lineup");
              }}
              style={{
                backgroundColor: activeMenu === "lineup" ? "#ff2782" : "#fff",
                paddingHorizontal: 10,
                paddingVertical: 10,
                flex: 1,
                marginHorizontal: 20,
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  color: activeMenu === "lineup" ? "#fff" : "#ff2782",
                  fontWeight: "500",
                  fontSize: 15,
                }}
              >
                Line Up
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                activeMenuF("timeline");
              }}
              style={{
                backgroundColor: activeMenu === "timeline" ? "#ff2782" : "#fff",
                paddingHorizontal: 10,
                paddingVertical: 10,
                flex: 1,
                marginHorizontal: 20,
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  color: activeMenu === "timeline" ? "#fff" : "#ff2782",
                  fontWeight: "500",
                  fontSize: 15,
                }}
              >
                Summary
              </Text>
            </TouchableOpacity>
          </View>

          {activeMenu === "lineup" ? (
            <View style={styles.formationSection}>
              <View style={styles.teams}>
                <View style={styles.team}>
                  <Image
                    source={require("../../../assets/logo-01.png")}
                    resizeMode="contain"
                    style={{ height: 35, width: 35 }}
                  />

                  <View style={styles.formation}>
                    <Text>{HomeTeam}</Text>
                    <Text style={{ color: "#aaa" }}>{HomeTeamFormation}</Text>
                  </View>
                </View>
                <View style={styles.team}>
                  <Image
                    source={require("../../../assets/logo-02.png")}
                    resizeMode="contain"
                    style={{ height: 35, width: 35 }}
                  />

                  <View style={styles.formation}>
                    <Text>{AwayTeam}</Text>
                    <Text style={{ color: "#aaa" }}>{AwayTeamFormation}</Text>
                  </View>
                </View>
              </View>

              <Image
                source={require("../../../assets/line.png")}
                resizeMode="contain"
                style={{ marginVertical: 10 }}
              />

              <Text style={styles.manager}>Manager</Text>

              <View style={styles.managerSplit}>
                {HomeTeamData.map((team, index) => (
                  <Text key={index}>{team.TeamManager}</Text>
                ))}
                {AwayTeamData.map((team, index) => (
                  <Text key={index}>{team.TeamManager}</Text>
                ))}
              </View>

              <Text style={styles.manager}>Lineups</Text>

              <View style={styles.lineups}>
                {HomeTeamData.map((team, index) => (
                  <View key={index}>
                    <Text>{team.Players.goalkepper}</Text>

                    <Text>{team.Players.defender1}</Text>
                    <Text>{team.Players.defender2}</Text>
                    <Text>{team.Players.defender3}</Text>
                    <Text>{team.Players.defender4}</Text>
                    <Text>{team.Players.defender5}</Text>

                    <Text>{team.Players.midfielder1}</Text>
                    <Text>{team.Players.midfielder2}</Text>
                    <Text>{team.Players.midfielder3}</Text>
                    <Text>{team.Players.midfielder4}</Text>
                    <Text>{team.Players.midfielder5}</Text>
                    <Text>{team.Players.attacker1}</Text>
                    <Text>{team.Players.attacker2}</Text>
                    <Text>{team.Players.attacker3}</Text>
                    <Text>{team.Players.attacker4}</Text>
                    <Text>{team.Players.attacker5}</Text>
                    <Text>{team.Players.benchs1}</Text>
                    <Text>{team.Players.benchs2}</Text>
                    <Text>{team.Players.benchs3}</Text>
                    <Text>{team.Players.benchs4}</Text>
                  </View>
                ))}
                <View></View>

                <View>
                  {AwayTeamData.map((team, index) => (
                    <View key={index}>
                      <Text>{team.Players.goalkepper}</Text>

                      <Text>{team.Players.defender1}</Text>
                      <Text>{team.Players.defender2}</Text>
                      <Text>{team.Players.defender3}</Text>
                      <Text>{team.Players.defender4}</Text>
                      <Text>{team.Players.defender5}</Text>

                      <Text>{team.Players.midfielder1}</Text>
                      <Text>{team.Players.midfielder2}</Text>
                      <Text>{team.Players.midfielder3}</Text>
                      <Text>{team.Players.midfielder4}</Text>
                      <Text>{team.Players.midfielder5}</Text>
                      <Text>{team.Players.attacker1}</Text>
                      <Text>{team.Players.attacker2}</Text>
                      <Text>{team.Players.attacker3}</Text>
                      <Text>{team.Players.attacker4}</Text>
                      <Text>{team.Players.attacker5}</Text>
                      <Text>{team.Players.benchs1}</Text>
                      <Text>{team.Players.benchs2}</Text>
                      <Text>{team.Players.benchs3}</Text>
                      <Text>{team.Players.benchs4}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.formationSection}>
              {MatchTimeline.slice(0)
                .reverse()
                .map((details, index) => (
                  <View style={styles.eachSummary} key={index}>
                    <View>
                      <Text
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: "#aaa",
                        }}
                      >
                        {details.MatchBody}
                      </Text>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: "500",
                          paddingTop: 10,
                        }}
                      >
                        {details.MatchNote}
                      </Text>
                    </View>

                    <View>
                      <Image
                        source={
                          details.MatchBody === "Yellow Card"
                            ? require("../../../assets/red.png")
                            : details.MatchBody === "Goal"
                            ? require("../../../assets/ball.png")
                            : details.MatchBody === "Red Card"
                            ? require("../../../assets/yellow.png")
                            : require("../../../assets/ft.png")
                        }
                        resizeMode="contain"
                        style={{ height: 35 }}
                      />
                    </View>
                  </View>
                ))}
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default MatchResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edeff2",
  },

  homeHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "white",
  },

  matchTopBar: {
    backgroundColor: "rgb(85, 3, 85)",

    paddingHorizontal: 10,
    paddingTop: 10,

    height: 230,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  dashboard: {
    marginHorizontal: 20,
    marginTop: -150,
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: "500",
  },

  dashboardBox: {
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,

    // borderWidth: 3,

    // borderColor: 'rgba(209, 225, 240, 0.782)',
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: "500",
  },

  competitionName: {
    color: "black",
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
    color: "black",
  },

  teamTxt: {
    color: "black",
    paddingTop: 5,
    fontWeight: "500",
  },

  scoreTxt: {
    color: "black",
    fontSize: 48,
  },

  navMenu: {
    marginVertical: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  formationSection: {
    marginHorizontal: 20,
  },

  teams: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  team: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  manager: {
    fontWeight: "500",
    textAlign: "center",
  },

  managerSplit: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },

  lineups: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  manager: {
    fontWeight: "500",
    textAlign: "center",
  },

  eachMatchTeamTime: {
    color: "red",
    fontWeight: "500",
    fontSize: 15,
  },

  eachMatchTeamDate: {
    color: "#aaa",
    fontWeight: "400",
    fontSize: 15,
  },

  eachSummary: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
