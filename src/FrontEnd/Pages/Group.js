import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useGlobalContext } from "../../Function/Context";
import Grouplist from "../Components/Group/Grouplist";
import { StatusBar } from "expo-status-bar";
import Header from "../Components/Others/Header";


const Group = () => {
  const { Group } = useGlobalContext();


  
  const [competition, competitionF] = useState(4)

  const points = Group;
  points.sort(function (a, b) {
    return b.points - a.points;
  });

  const Group1Elements = points.map((group, index) => {
    if (group.group === 1) {
      return (
        <Grouplist
          key={index}
          id={group.id}
          name={group.name}
          played={group.played}
          draw={group.draw}
          win={group.won}
          lost={group.lost}
          gd={group.goalD}
          point={group.points}
        />
      );
    }
  });
  const Group2Elements = points.map((group, index) => {
    if (group.group === 2) {
      return (
        <Grouplist
          key={index}
          id={group.id}
          name={group.name}
          played={group.played}
          draw={group.draw}
          win={group.won}
          lost={group.lost}
          gd={group.goalD}
          point={group.points}
        />
      );
    }
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
    <Header/>


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

export default Group;

const styles = StyleSheet.create({
  container: {
   flex: 1,
    backgroundColor: "#edeff2",
     paddingHorizontal: 10,
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
  
});
