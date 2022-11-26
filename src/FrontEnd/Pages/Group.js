import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import React from "react";
import { useGlobalContext } from "../../Function/Context";
import Grouplist from "../Components/Group/Grouplist";
import { StatusBar } from "expo-status-bar";
import Header from "../Components/Others/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Nav from "../Components/Others/Nav";
import Loader from "../Components/Others/Loader";


const Group = ({navigation}) => {
  const { TeamsFromDB, getTeamsFromDB, competitionType, loader } =
    useGlobalContext();



  const points = TeamsFromDB;
  points.sort(function (a, b) {
    return b.points - a.points;
  });

  const Group1Elements = points.map((group, index) => {
    if (group.TeamGroup === 1 && group.Competition === competitionType) {
      return (
        <Grouplist
          key={index}
          id={group.id}
          name={group.TeamName}
          played={group.stat.matchplayed}
          draw={group.stat.draw}
          win={group.stat.wins}
          lost={group.stat.loss}
          gd={group.stat.gd}
          point={group.stat.points}
        />
      );
    }
  });
 const Group2Elements = points.map((group, index) => {
    if (group.TeamGroup === 2 && group.Competition === competitionType) {
      return (
        <Grouplist
          key={index}
          id={group.id}
          name={group.TeamName}
          played={group.stat.matchplayed}
          draw={group.stat.draw}
          win={group.stat.wins}
          lost={group.stat.loss}
          gd={group.stat.gd}
          point={group.stat.points}
        />
      );
    }
  });

   const wait = (timeout) => {
     return new Promise((resolve) => setTimeout(resolve, timeout));
   };

   const [refreshing, setRefreshing] = React.useState(false);

   const onRefresh = React.useCallback(() => {
     setRefreshing(true);
     getTeamsFromDB()
     wait(2000).then(() => setRefreshing(false));
   }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
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
            <View style={styles.group}>
              <Text style={styles.groupName}>Group One</Text>
              <View style={styles.table}>
                <View style={styles.topTable}>
                  {/* <Text style={styles.tableHead}>No</Text> */}
                  <Text style={styles.tableHeadOne}>Teams</Text>
                  <Text style={styles.tableHead}>P</Text>
                  <Text style={styles.tableHead}>W</Text>
                  <Text style={styles.tableHead}>L</Text>
                  <Text style={styles.tableHead}>D</Text>
                  <Text style={styles.tableHead}>GD</Text>
                  <Text style={styles.tableHead}>Pts</Text>
                </View>
                {Group1Elements}
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.groupName}>Group Two</Text>
              <View style={styles.table}>
                <View style={styles.topTable}>
                  {/* <Text style={styles.tableHead}>No</Text> */}
                  <Text style={styles.tableHeadOne}>Teams</Text>
                  <Text style={styles.tableHead}>P</Text>
                  <Text style={styles.tableHead}>W</Text>
                  <Text style={styles.tableHead}>L</Text>
                  <Text style={styles.tableHead}>D</Text>
                  <Text style={styles.tableHead}>GD</Text>
                  <Text style={styles.tableHead}>Pts</Text>
                </View>
                {Group2Elements}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Group;

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
  marginVertical:20,
  display: 'flex',
  flexDirection: 'row', 
  justifyContent: 'space-between',
  
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
fontWeight: '500'
  },
  tableHeadOne: {
    color: "black",
fontWeight: '500',
  width: 65,
  },
  titleText: {
    fontSize: 15,
    fontWeight: "600",
    // marginBottom: 10,
  },
  
});
