import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useGlobalContext } from "../../Function/Context";


const MatchResult = () => {
  const { MatchState } = useGlobalContext();

  return (
    <ScrollView style={styles.container}>

      <View style={styles.matchTopBar}>
 <View style={styles.homeHeader}>
        <TouchableOpacity style={{backgroundColor: 'aliceblue', opacity: 1, borderRadius: 50,}}>
        <Image
            source={require("../../../assets/back.png")}
            resizeMode="cover"
            style={{ height: 30, width: 30,   }}
          />
        </TouchableOpacity>
        <View style={styles.headerTitleDiv}>
       {/* <Text style={styles.headerTitle}>Engine <Text style={styles.headerTitleScore} >Scores</Text></Text> */}
        </View>
        <View style={styles.profilePic}>
        {/* <Image
            source={require("../../../assets/pro.jpg")}
            resizeMode="cover"
            style={{ height: 40, width: 40, borderRadius: 50,  }}
          /> */}
        </View>
      </View>


      

      </View>


     
    </ScrollView>
  );
};

export default MatchResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edeff2",
    
  },

    matchTopBar: {
    backgroundColor: 'purple',

    paddingHorizontal: 10,
    paddingTop: 10
  },

    homeHeader :{
display: 'flex',
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center'
  },

  headerTitle :{
fontSize:26,
fontWeight: '400'

  },



  titleText: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomColor: "#aaa",
    borderBottomWidth: 1,
  },

  scoreBoard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  score: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scoreTxt: {
    fontWeight: "600",
    fontSize: 45,
    paddingLeft: 5,
    paddingRight: 5,
  },
  scoreLine: {
    fontWeight: "600",
    fontSize: 45,
    paddingLeft: 5,
    paddingRight: 5,
  },

  logo: {
    height: "100%",
    width: "100%",
  },
  hh: {
    height: 80,
    width: 48,
    justifyContent: "center",
    marginTop: 5,
    // backgroundColor: "#aaa",
  },
  firstTeam: {
    alignItems: "center",
  },
  teamName: {
    fontSize: 14,
    fontWeight: "500",
  },
  matches: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
  },
  matchesRight: {
    display: "flex",
    // alignItems: "flex-end",
    flexDirection: "row-reverse",
    width: "100%",
    marginTop: 20,
    // backgroundColor: "yellow",
  },
  left: {
    paddingRight: 10,
  },
  line: {
    backgroundColor: "#aaa",
    width: 1,
    height: "100%",
    marginRight: 10,
  },

  teams: {
    // flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },

  scoreActions: {
    backgroundColor: "white",

    borderRadius: 5,
    padding: 10,
    // height: 400,
    flexDirection: "column-reverse",
  },

  scoreActionsCon: {
    backgroundColor: "aliceblue",
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
  },

  Matchdetails: {
    marginTop: 10,
    padding: 10,
    marginBottom: 30,
  },
  MDhead: {
    textAlign: "center",
    borderBottomColor: "#aaa",
    padding: 5,
    borderBottomWidth: 1,
  },
  items: {
    padding: 5,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },

  itemsTxt: {
    fontWeight: "500",
  },

  leftTextAssist: {
    color: "#aaa",
  },
  leftText: {
    fontSize: 15,
  },
});
