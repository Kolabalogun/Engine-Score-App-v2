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
import React from "react";
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

const stack = createNativeStackNavigator();

const Home = ({ navigation }) => {
  const { MatchState } = useGlobalContext();




  const [competition, competitionF] = useState(4)


const [matchActive, matchActiveF] = useState(false)


  function onMatchClick(params) {
    navigation.navigate("MatchResult");
  }

  const MatchDayOneElements = MatchState.map((match, index) => {
    if (match.matchDay === 1) {
      return (
        <Pressable key={index} onPress={onMatchClick}>
          <MatchList
            //   id={match.id}
            matchDay={match.matchDay}
            firstteam={match.firstteam}
            secondteam={match.secondteam}
            firstteamScore={match.firstteamScore}
            secondteamScore={match.secondteamScore}
            time={match.time}
            gamestate={match.gamestate}
          />
        </Pressable>
      );
    }
  });
  const MatchDayTwoElements = MatchState.map((match, index) => {
    if (match.matchDay === 2) {
      return (
        <Pressable key={index} onPress={() => onMatchClick(match.id)}>
          <MatchList
            //   id={match.id}
            matchDay={match.matchDay}
            firstteam={match.firstteam}
            secondteam={match.secondteam}
            firstteamScore={match.firstteamScore}
            secondteamScore={match.secondteamScore}
            time={match.time}
            gamestate={match.gamestate}
          />
        </Pressable>
      );
    }
  });
  const MatchDayThreeElements = MatchState.map((match, index) => {
    if (match.matchDay === 3) {
      return (
        <Pressable key={index} onPress={() => onMatchClick(match.id)}>
          <MatchList
            id={match.id}
            matchDay={match.matchDay}
            firstteam={match.firstteam}
            secondteam={match.secondteam}
            firstteamScore={match.firstteamScore}
            secondteamScore={match.secondteamScore}
            time={match.time}
            gamestate={match.gamestate}
          />
        </Pressable>
      );
    }
  });

  function Screen_A() {
    return (

        <View style={styles.container}>
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

<ScrollView>


 <View style={styles.dashboard}>

<Text  style={styles.dashboardTitle}>
  Top Pick
</Text>

<View  style={styles.dashboardBox}>

  <Text style={styles.competitionName}>{competition === 4 ? 'Engine 4.0' : 'Engine 3.0'}</Text>
  <Text style={styles.matchDay}>Matchday One</Text>
  

  <View  style={styles.scoreBoard}>
      <View  style={styles.teamBoard}>

         <Image
            source={require("../../../assets/logo-01.png")}
            resizeMode="contain"
            style={{ height: 90, width: 90 }}
          />

              <Text style={styles.teamTxt}>Mechanical</Text>
    
  </View> 
   <View  style={styles.score}>
    <Text style = {styles.scoreTxt}>0</Text>
      <Text style = {styles.scoreTxt}>:</Text>
        <Text style = {styles.scoreTxt}>0</Text>
  </View>
    <View  style={styles.teamBoard}>
        <Image
            source={require("../../../assets/logo-02.png")}
            resizeMode="contain"
            style={{ height: 90, width: 90 }}
          />

              <Text style={styles.teamTxt}>Computer</Text>
  </View>
  </View>


</View>

</View>

<View>

  <Text  style={styles.dashboardTitle}>
  Match
</Text>

<TouchableOpacity  onPress={() => navigation.navigate('MatchResult')} style={styles.eachMatch}>
<View style={styles.eachMatchTeam}>

  <Text style={styles.eachMatchTeamTxt}>Mechanical</Text>

 <Image
            source={require("../../../assets/logo-01.png")}
            resizeMode="contain"
            style={{ height: 45, width: 45,  }}
          />


</View><View style={styles.eachMatchTime}>

 <Text style={styles.eachMatchTeamTime}>03:00</Text>
  <Text style={styles.eachMatchTeamDate}>20 Jan</Text>
</View><View style={styles.eachMatchTeam}>

  
 <Image
            source={require("../../../assets/logo-02.png")}
            resizeMode="contain"
            style={{ height: 45, width: 45,  }}
          />

  <Text style={styles.eachMatchTeamTxt}>Computer</Text>

</View>
</TouchableOpacity>


<TouchableOpacity  onPress={() => navigation.navigate('MatchResult')} style={styles.eachMatch}>
<View style={styles.eachMatchTeam}>

  <Text style={styles.eachMatchTeamTxt}>Mechanical</Text>

 <Image
            source={require("../../../assets/logo-01.png")}
            resizeMode="contain"
            style={{ height: 45, width: 45,  }}
          />


</View><View style={styles.eachMatchTime}>

 <Text style={styles.eachMatchTeamTime}>03:00</Text>
  <Text style={styles.eachMatchTeamDate}>20 Jan</Text>
</View><View style={styles.eachMatchTeam}>

  
 <Image
            source={require("../../../assets/logo-02.png")}
            resizeMode="contain"
            style={{ height: 45, width: 45,  }}
          />

  <Text style={styles.eachMatchTeamTxt}>Computer</Text>

</View>
</TouchableOpacity>
<TouchableOpacity  onPress={() => navigation.navigate('MatchResult')} style={styles.eachMatch}>
<View style={styles.eachMatchTeam}>

  <Text style={styles.eachMatchTeamTxt}>Mechanical</Text>

 <Image
            source={require("../../../assets/logo-01.png")}
            resizeMode="contain"
            style={{ height: 45, width: 45,  }}
          />


</View><View style={styles.eachMatchTime}>

 <Text style={styles.eachMatchTeamTime}>03:00</Text>
  <Text style={styles.eachMatchTeamDate}>20 Jan</Text>
</View><View style={styles.eachMatchTeam}>

  
 <Image
            source={require("../../../assets/logo-02.png")}
            resizeMode="contain"
            style={{ height: 45, width: 45,  }}
          />

  <Text style={styles.eachMatchTeamTxt}>Computer</Text>

</View>
</TouchableOpacity>
<TouchableOpacity  onPress={() => navigation.navigate('MatchResult')} style={styles.eachMatch}>
<View style={styles.eachMatchTeam}>

  <Text style={styles.eachMatchTeamTxt}>Mechanical</Text>

 <Image
            source={require("../../../assets/logo-01.png")}
            resizeMode="contain"
            style={{ height: 45, width: 45,  }}
          />


</View><View style={styles.eachMatchTime}>

 <Text style={styles.eachMatchTeamTime}>03:00</Text>
  <Text style={styles.eachMatchTeamDate}>20 Jan</Text>
</View><View style={styles.eachMatchTeam}>

  
 <Image
            source={require("../../../assets/logo-02.png")}
            resizeMode="contain"
            style={{ height: 45, width: 45,  }}
          />

  <Text style={styles.eachMatchTeamTxt}>Computer</Text>

</View>
</TouchableOpacity>
<TouchableOpacity  onPress={() => navigation.navigate('MatchResult')} style={styles.eachMatch}>
<View style={styles.eachMatchTeam}>

  <Text style={styles.eachMatchTeamTxt}>Mechanical</Text>

 <Image
            source={require("../../../assets/logo-01.png")}
            resizeMode="contain"
            style={{ height: 45, width: 45,  }}
          />


</View><View style={styles.eachMatchTime}>

 <Text style={styles.eachMatchTeamTime}>03:00</Text>
  <Text style={styles.eachMatchTeamDate}>20 Jan</Text>
</View><View style={styles.eachMatchTeam}>

  
 <Image
            source={require("../../../assets/logo-02.png")}
            resizeMode="contain"
            style={{ height: 45, width: 45,  }}
          />

  <Text style={styles.eachMatchTeamTxt}>Computer</Text>

</View>
</TouchableOpacity>

  
  </View> 



</ScrollView>


    </View>
    </View>
   

  
    );
  }

  return (
    <stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <stack.Screen name="Screen_A" component={Screen_A} />
      <stack.Screen name="MatchResult" component={MatchResult} />
    </stack.Navigator>
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
   paddingHorizontal: 30,
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

});
