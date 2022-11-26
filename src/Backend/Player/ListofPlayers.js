import {
  Image,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import { useGlobalContext } from "../../Function/Context";
import Loader from "../../FrontEnd/Components/Others/Loader";

const ListofPlayers = ({ navigation }) => {
  const {
    competition,
    competitionF,
    getPlayerGoalAssistData,
    notificationF,
    currentUser,
    loader,
    loaderF,
    TeamsFromDB,
    handleDeleteTeam,

    PlayerGoalAssistData,
  } = useGlobalContext();

  function navigateToAddNewTeam(params) {
    navigation.navigate("Players");
  }


  function name(params) {
    
  }

  const Engine40list = PlayerGoalAssistData.map((teams, index) => {
    if (teams.Competition === "Engine 4.0") {
      return (
        <TouchableOpacity key={index} style={styles.eachMatch}>
          <View style={styles.eachMatchTeam}>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.eachMatchTeamTxt}>{teams.PlayerName}</Text>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 14,
                  color: '#aaa'
                }}
              >
                {teams.TeamNameSelect}
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 14,
                  color: '#aaa'
                }}
              >
             Goals: {teams.Goals}
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 14,
                  color: '#aaa'
                }}
              >
               Assist {teams.Assists}
              </Text>
            </View>
            {/* <Image
            source={require("../../../../assets/logo-01.png")}
            resizeMode="contain"
            style={{ height: 45, width: 45,  }}
          /> */}
          </View>

          <View style={styles.eachMatchTeam}>
            <TouchableOpacity
              onPress={() => handleDeleteTeam(teams.id)}
              style={{ backgroundColor: "red", borderRadius: 10 }}
            >
              <Text style={{ color: "white", padding: 7 }}>Delete Player</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    }
  });
  const Engine30list = PlayerGoalAssistData.map((teams, index) => {
    if (teams.Competition === "Engine 3.0") {
      return (
        <TouchableOpacity key={index} style={styles.eachMatch}>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.eachMatchTeamTxt}>{teams.PlayerName}</Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                color: "#aaa",
              }}
            >
              {teams.TeamNameSelect}
            </Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                color: "#aaa",
              }}
            >
              Goals: {teams.Goals}
            </Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                color: "#aaa",
              }}
            >
              Assist {teams.Assists}
            </Text>
          </View>

          <View style={styles.eachMatchTeam}>
            <TouchableOpacity
              onPress={() => handleDeleteTeam(teams.id)}
              style={{ backgroundColor: "red", borderRadius: 10 }}
            >
              <Text style={{ color: "white", padding: 7 }}>Delete Player</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    }
  });

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
        <TouchableOpacity onPress={(functions)} style={styles.profilePic}>
          <Image
            source={imgtype}
            resizeMode="cover"
            style={{ height: 30, width: 30 }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPlayerGoalAssistData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Headers
        functions={navigateToAddNewTeam}
        imgtype={require("../../../assets/add.png")}
      />
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

      {loader ? (
        <Loader />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          {competition === 4 ? Engine40list : Engine30list}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ListofPlayers;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "aliceblue",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 10,
    paddingTop: 10,
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

  topSection: {
    paddingTop: 15,
  },
  topText: {
    fontWeight: "700",
    fontSize: 25,

    color: "rgb(7, 1, 57)",
    // marginTop: 10,
  },
  capText: {
    color: "rgb(100, 100, 100)",
    marginTop: 10,
  },

  Inputs: {
    marginTop: 10,
    flex: 1,
    justifyContent: "center",
  },
  Input: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 15,
    borderColor: "#aaa",
  },
  InputTextArea: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 15,
    borderColor: "#aaa",

    // height: 170,
    alignItems: "baseline",
    justifyContent: "flex-start",

    textAlignVertical: "top",
  },
  btn: {
    paddingVertical: 12,
    backgroundColor: "#ff2782",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "100%",
    marginVertical: 20,
  },
  btnTxt: {
    color: "white",
    fontSize: 16,
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

  navMenu: {
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  eachMatch: {
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    borderWidth: 3,

    alignItems: "center",

    borderColor: "rgba(209, 225, 240, 0.782)",
  },

  eachMatchTeam: {
    //    flex:1,
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
    fontSize: 15,
  },
});
