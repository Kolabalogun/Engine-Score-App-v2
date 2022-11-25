import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useGlobalContext } from "../../Function/Context";
import Grouplist from "../Components/Group/Grouplist";
import { StatusBar } from "expo-status-bar";
import Header from "../Components/Others/Header";
import { useState } from "react";


const Group = ({navigation}) => {
  const { TeamsFromDB } = useGlobalContext();


   const [competitionType, competitionTypeF] = useState('Engine 4.0')

  
  const [competition, competitionF] = useState(4)

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
  <Header navigation={navigation}/>


    <View style={styles.navMenu}>

  <TouchableOpacity onPress={()=> {competitionF(4)
competitionTypeF('Engine 4.0')  
}} style={{ backgroundColor: competition === 4 ? '#ff2782' : '#fff'
    , 
    paddingHorizontal:10 ,
    paddingVertical:15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 20}}>
<Text style={{ color: competition===4 ? '#fff' : '#ff2782'
    , fontWeight:'500',
    fontSize:15}}>Engine 4.0</Text>
  </TouchableOpacity>

  
  <TouchableOpacity onPress={()=> {competitionF(3)
competitionTypeF('Engine 3.0')  
}} style={{ backgroundColor: competition === 3 ? '#ff2782' : '#fff'
    , 
    paddingHorizontal:10 ,
    paddingVertical:15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 20}}>
<Text style={{ color: competition===3 ? '#fff' : '#ff2782'
    , fontWeight:'500',
    fontSize:15}}>Engine 3.0</Text>
  </TouchableOpacity>
  
</View>


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

      </View>
    </ScrollView>
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
