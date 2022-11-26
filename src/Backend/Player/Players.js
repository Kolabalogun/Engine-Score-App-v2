import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useGlobalContext } from "../../Function/Context";
import { db } from "../../Utils/Firebase";
import Loader from "../../FrontEnd/Components/Others/Loader";
import SelectDropdown from "react-native-select-dropdown";

const Players = ({ navigation }) => {
  const {
    TeamsFromDB,
    notification,
    notificationF,
    loader,
    loaderF,
  } = useGlobalContext();

  const [Competition, CompetitionF] = useState("");

  const [TeamData, TeamDataF] = useState([]);

  const [TeamNameFilter, TeamNameFilterF] = useState([]);
  const [TeamNameSelect, TeamNameSelectF] = useState(null);



  useEffect(() => {
    const data = TeamsFromDB.filter(
      (team, index) => team.Competition === Competition
    );

    TeamNameFilterF(data.map((d) => d.TeamName));
    TeamDataF(data);
  }, [Competition, TeamsFromDB]);

  const [PlayerData, PlayerDataF] = useState([]);

  useEffect(() => {
    const data = TeamData?.filter(
      (team, index) => team.TeamName === TeamNameSelect
    );

    if (TeamData.length > 0) {
      const propertyNames = data[0].Players;

      const dd = Object.values(propertyNames);

      PlayerDataF(dd);
    }
  }, [Competition, TeamNameSelect]);

  const competitionData = ["Engine 4.0", "Engine 3.0"];
  const typee = ["Goal", "Assist"];

 

  const [Goals, GoalsF] = useState("");

  const [Assists, AssistsF] = useState("");

  const [PlayerName, PlayerNameF] = useState("");
  const [GoalsSelect, GoalsSelectF] = useState("");




    const [PlayerDataFromDB, PlayerDataFromDBF] = useState([]);


      useEffect(() => {
        getBlogDetail();
      }, [Competition, TeamNameSelect, PlayerName, PlayerData, TeamData]);

      const getBlogDetail = async () => {
        const docRef = doc(db, "Player Data", 'WmVhSufxYzBSkL8HsqkF');
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          PlayerDataFromDBF([ ...snapshot.data().playerDatas ]);
      
        }
      };

const [FilteredPlayerDataFromDB, FilteredPlayerDataFromDBF] = useState([]);

       useEffect(() => {
        if (
          PlayerDataFromDB.length > 0 &&
          TeamNameSelect &&
          PlayerName &&
          Competition
        ) {
          const data = PlayerDataFromDB.filter(
            (player) =>
              !(player.Competition === Competition &&
                player.PlayerName === PlayerName &&
              player.TeamNameSelect === TeamNameSelect)
          );

          if (data.length > 0) {
            
          FilteredPlayerDataFromDBF(data);
          }

        }

        GoalsF(FilteredPlayerDataFromDBForGoalData.Goals)
        AssistsF(FilteredPlayerDataFromDBForGoalData.Assists)
       

       }, [PlayerDataFromDB, Competition, TeamNameSelect, PlayerName]);



       const [
         FilteredPlayerDataFromDBForGoalData,
         FilteredPlayerDataFromDBForGoalDataF,
       ] = useState({
         Goals: 0,
         Assists: 0,
       });
console.log(FilteredPlayerDataFromDBForGoalData);

   useEffect(() => {
     if (PlayerDataFromDB.length > 0 && TeamNameSelect && PlayerName && Competition) {
       const data = PlayerDataFromDB.filter(
         (player) =>
           (player.Competition === Competition &&
             player.PlayerName === PlayerName &&
           player.TeamNameSelect === TeamNameSelect)
       );

       if (data.length > 0) {
        
       FilteredPlayerDataFromDBForGoalDataF(data[0]);
       } else {
        FilteredPlayerDataFromDBForGoalDataF({
         Goals: 0,
         Assists: 0,
       });
       }

     
     GoalsF(FilteredPlayerDataFromDBForGoalData.Goals);
     AssistsF(FilteredPlayerDataFromDBForGoalData.Assists);
     }

   }, [PlayerDataFromDB, Competition, TeamNameSelect, PlayerName]);





  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      TeamNameSelect &&
      PlayerName &&
      Competition &&
      Goals &&
     
      Assists
    ) {
      // if we adding new team
      loaderF(true);
      try {
        await updateDoc(doc(db, "Player Data", "WmVhSufxYzBSkL8HsqkF"), {
          playerDatas: [
            ...FilteredPlayerDataFromDB,
            {TeamNameSelect ,
              PlayerName ,
              Competition ,
              Goals ,
             
              Assists,}
          ],
        });
          
              GoalsF(0)
              AssistsF(0)

              navigation.navigate('Stat')
                  loaderF(false);

      } catch (error) {
        console.log(error, "line 219");
      }
    } else {
      return notificationF("All fields must be filled");
    }
  };

 

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
          {/* <Image
            source={imgtype}
            resizeMode="cover"
            style={{ height: 30, width: 30,  }}
          /> */}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <SafeAreaView style={styles.container}>
          <View>
            <Headers
            />

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.topSection}>
                <Text style={styles.topText}>Player Data</Text>
                <Text style={styles.capText}>Add Goal Scorer or Assists</Text>
              </View>

              <KeyboardAvoidingView style={styles.Inputs}>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Competition
                  </Text>

                  <SelectDropdown
                    data={competitionData}
                    defaultButtonText="Select Competition"
                    buttonStyle={styles.dropdownStyle}
                    buttonTextStyle={styles.dropdownStyleTxt}
                    onSelect={(selectedItem, index) => {
                      CompetitionF(selectedItem);
                    }}
                  />
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Player's Team
                  </Text>

                  <SelectDropdown
                    data={TeamNameFilter}
                    defaultButtonText="Please select Player's Team"
                    buttonStyle={styles.dropdownStyle}
                    buttonTextStyle={styles.dropdownStyleTxt}
                    onSelect={(selectedItem, index) => {
                      TeamNameSelectF(selectedItem);
                    }}
                  />
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Player's Name
                  </Text>

                  <SelectDropdown
                    data={PlayerData}
                    defaultButtonText="Please select Away Team"
                    buttonStyle={styles.dropdownStyle}
                    buttonTextStyle={styles.dropdownStyleTxt}
                    onSelect={(selectedItem, index) => {
                      PlayerNameF(selectedItem);
                    }}
                  />
                </View>
              

                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Number of Goals
                  </Text>

                  <TextInput
                    value={Goals}
                    name="goalkepper"
                    onChangeText={(e) => GoalsF(e)}
                    placeholder="Number of Goals"
                    maxLength={2}
                    keyboardType="decimal-pad"
                    style={styles.InputTextArea}
                  />
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Assist
                  </Text>

                  <TextInput
                    value={Assists}
                    name="goalkepper"
                    onChangeText={(e) => AssistsF(e)}
                    placeholder="Number of Assist"
                    maxLength={2}
                    keyboardType="decimal-pad"
                    style={styles.InputTextArea}
                  />
                </View>
              </KeyboardAvoidingView>
              <Text style={{ color: "red", alignSelf: "center", padding: 3 }}>
                {notification}
              </Text>
              <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btnTxt}>Save</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Players;

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
