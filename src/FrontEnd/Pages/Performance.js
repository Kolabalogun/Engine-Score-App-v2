import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useGlobalContext } from "../../Function/Context";
// import Performancelist from "../Components/Performance/Performancelist";
import { StatusBar } from "expo-status-bar";
import Header from "../Components/Others/Header";
import { useState } from "react";


const Performance = () => {
  const { Group } = useGlobalContext();


  
  const [competition, competitionF] = useState(4)


  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
 <Header navigation={navigation}/>


    <View style={styles.navMenu}>

  <TouchableOpacity onPress={()=> {competitionF(4)}} style={{ backgroundColor: competition === 4 ? '#ff2782' : '#fff'
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

  
  <TouchableOpacity onPress={()=> {competitionF(3)}} style={{ backgroundColor: competition === 3 ? '#ff2782' : '#fff'
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



      </View>
    </ScrollView>
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
  marginVertical:20,
  display: 'flex',
  flexDirection: 'row', 
  justifyContent: 'space-between',
  
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
fontWeight: '500'
  },
  titleText: {
    fontSize: 15,
    fontWeight: "600",
    // marginBottom: 10,
  },
  
});
