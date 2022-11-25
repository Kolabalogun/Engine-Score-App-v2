import {
  Image,
  Platform,
  Pressable,
  ScrollView,
 TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
// import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import MatchList from "../Components/Match/MatchList";
// import { useGlobalContext } from "../../Backend/Context";
import { NavigationContainer } from "@react-navigation/native";
// import MatchResult from "../Components/Match/MatchResult";
import { useGlobalContext } from "../../Function/Context";
import MatchResult from "./MatchResult";
import { color } from "react-native-reanimated";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../Components/Others/Header";
import InternetChecker from "../Components/Others/InternetChecker";

const stack = createNativeStackNavigator();

const Home = ({ navigation }) => {
     const {MatchsFromDB, competitionF, competition, TopPicksDB, }= useGlobalContext()



          const Engine40list = MatchsFromDB.map((match, index) =>{
    if (match.Competition === 'Engine 4.0') {
        return (
         <TouchableOpacity key={index} onPress={() => navigation.navigate('MatchResult', {
                matchId: match.id
            })} style={styles.eachMatch}>
<View style={styles.eachMatchTeam}>

  <Text style={styles.eachMatchTeamTxt}>{match.HomeTeam}</Text>

 <Image
            source={require("../../../assets/logo-01.png")}
            resizeMode="contain"
            style={{ height: 45, width: 45,  }}
          />


</View>
<View style={styles.eachMatchTime}>

    

    {match.MatchActive ?<View style={{flexDirection: 'row', }}>
        <Text style={styles.eachMatchTeamTimeScore}>{match.HomeTeamScore}</Text> 
    <Text style={styles.eachMatchTeamDateScore}>-</Text>
  <Text style={styles.eachMatchTeamTimeScore}>{match.AwayTeamScore}</Text>
  </View>
   : <>
    <Text style={styles.eachMatchTeamTime}>{match.Matchtime}</Text>
  <Text style={styles.eachMatchTeamDate}>{match.MatchDate}</Text></>}

 
  </View>
  <View style={styles.eachMatchTeam}>

  
 <Image
            source={require("../../../assets/logo-02.png")}
            resizeMode="contain"
            style={{ height: 45, width: 45,  }}
          />

  <Text style={styles.eachMatchTeamTxt}>{match.AwayTeam}</Text>

</View>
</TouchableOpacity>
        )
    }
  } )
        const Engine30list = MatchsFromDB.map((match, index) =>{
    if (match.Competition === 'Engine 3.0') {
        return (
         <TouchableOpacity key={index} onPress={() => navigation.navigate('MatchResult', {
                matchId: match.id
            })} style={styles.eachMatch}>
<View style={styles.eachMatchTeam}>

  <Text style={styles.eachMatchTeamTxt}>{match.HomeTeam}</Text>

 <Image
            source={require("../../../assets/logo-01.png")}
            resizeMode="contain"
            style={{ height: 45, width: 45,  }}
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
            style={{ height: 45, width: 45,  }}
          />

  <Text style={styles.eachMatchTeamTxt}>{match.AwayTeam}</Text>

</View>
</TouchableOpacity>
        )
    }
  } )


  function onMatchClick(params) {
    navigation.navigate("MatchResult");
  }


  const [Competition, CompetitionF] = useState('Engine 4.0')



  // Top Pick  

   const [TopPickState, TopPickStateF] = useState([])

  useEffect(() => {
  const data = TopPicksDB.filter(top => top.Competition === Competition)

  
  TopPickStateF(data);
  }, [TopPicksDB, Competition])
  






  function Screen_A() {
    return (

        <View style={styles.container}>
        <View style={styles.main}>

          {/* {!online && <InternetChecker/>} */}

      
<Header navigation={navigation}/>


<View style={styles.navMenu}>

  <TouchableOpacity onPress={()=> {competitionF(4)
CompetitionF('Engine 4.0')  
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
CompetitionF('Engine 3.0')    
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

<ScrollView showsVerticalScrollIndicator={false}>


 <View style={styles.dashboard}>

<Text  style={styles.dashboardTitle}>
  Top Pick
</Text>

{TopPickState.map((tp, index) =>
<TouchableOpacity 
 key={index}  style={styles.dashboardBox}>

  <Text style={styles.competitionName}>{tp.Competition}</Text>
  <Text style={styles.matchDay}>Matchday One</Text>
  

  <View  style={styles.scoreBoard}>
      <View  style={styles.teamBoard}>

         <Image
            source={require("../../../assets/logo-01.png")}
            resizeMode="contain"
            style={{ height: 90, width: 90 }}
          />

              <Text style={styles.teamTxt}>{tp.MatchSelect.HomeTeam}</Text>
    
  </View> 
   <View  style={styles.score}>
    {
      tp.MatchSelect.MatchActive ? <>
      <Text style = {styles.scoreTxt}>{tp.MatchSelect.HomeTeamScore}</Text>
      <Text style = {styles.scoreTxt}>:</Text>
        <Text style = {styles.scoreTxt}>{tp.MatchSelect.AwayTeamScore}</Text>
        </> :
        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1}}>
         <Text style={{
  color:'white',
  fontWeight:'500',
  }}>{tp.MatchSelect.Matchtime}</Text>
         <Text style={{  color:'white',
  fontWeight:'500',
  fontSize: 15}}>{'vs'}</Text>
  <Text style={styles.eachMatchTeamDate}>{tp.MatchSelect.MatchDate}</Text>

        </View>
    }
  </View>
    <View  style={styles.teamBoard}>
        <Image
            source={require("../../../assets/logo-02.png")}
            resizeMode="contain"
            style={{ height: 90, width: 90 }}
          />

              <Text style={styles.teamTxt}>{tp.MatchSelect.AwayTeam}</Text>
  </View>
  </View>


</TouchableOpacity>
 )}



</View>

<View>

  <Text  style={styles.dashboardTitle}>
  Match
</Text>

{competition===4 ? Engine40list
 
 :

Engine30list}
  
  </View> 



</ScrollView>


    </View>
    </View>
   

  
    );
  }

  return (
    <Screen_A/>
  );
};

export default Home;

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


  dashboard: {
   marginBottom:10,
  
  },
  dashboardTitle: {
   fontSize: 18,
  fontWeight: '500'
  },

  
  dashboardBox: {
   marginBottom:10,
   marginTop: 10,
   backgroundColor:'rgb(85, 3, 85)',
   alignItems:'center',
   borderRadius:10,
   padding: 15
  
  },
  dashboardTitle: {
   fontSize: 18,
  fontWeight: '500'
  },


  competitionName: {
  color: 'white',
   fontSize: 14,
   marginBottom:5
  
  },
  matchDay: {
   fontSize: 13,
  color: '#aaa',
  },

  
  scoreBoard: {
 
   marginTop: 5,
  flexDirection: 'row',
  justifyContent:'space-between', 
  alignItems:'center'
  
  },
  teamBoard: {
   fontSize: 18,
  fontWeight: '500'
  ,
  alignItems: 'center'
  },

   score: {
   flex:1,
   flexDirection: 'row',
   justifyContent: 'space-between',
   color: 'white'
  },

   teamTxt: {
  color: 'white',
  paddingTop: 5
  },

   scoreTxt: {
  color: 'white',
  fontSize:48
  },


  eachMatch: {
   borderRadius: 10,
   backgroundColor:'white',flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   paddingHorizontal: 15,
   paddingVertical:10,
   marginVertical:5,
   borderWidth: 3,
  
    alignItems: 'center',

    borderColor: 'rgba(209, 225, 240, 0.782)',
    
  },

   eachMatchTeam: {
   flex:1,
   flexDirection: 'row',
   justifyContent: 'space-between',
   color: 'white',
   alignItems: 'center'
  },

   eachMatchTime: {
  flex:1,
  alignItems: 'center'
  },

   eachMatchTeamTxt: {
 fontWeight: '500'
  },

     eachMatchTeamTime: {
  color:'red',
  fontWeight:'500',
  },

       eachMatchTeamDate: {
  color:'#aaa',
  fontWeight:'400',
  },

  
     eachMatchTeamTimeScore: {
  color:'red',
  fontWeight:'500',
  fontSize: 17
  },

       eachMatchTeamDateScore: {
  color:'#aaa',
  fontWeight:'400',
  fontSize: 20,
    paddingHorizontal: 8
  },

});
