import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../../FrontEnd/Components/Others/Header'
import { useGlobalContext } from '../../Function/Context'

const MatchList = ({navigation}) => {

    const {MatchsFromDB, competitionF, competition}= useGlobalContext()

     function Headers() {
    return(
       <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() =>{
          navigation.toggleDrawer();
        }} style={styles.profilePic}>
        <Image
            source={require("../../assets/menu.png")}
            resizeMode="cover"
            style={{ height: 20, width: 20,  }}
          />
        </TouchableOpacity>
        <View style={styles.headerTitleDiv}>
       <Text style={styles.headerTitle}>Engine <Text style={styles.headerTitleScore} >Scores</Text></Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Create Match')} style={styles.profilePic}>
        <Image
           source={require("../../assets/ft.png")}
            resizeMode="cover"
            style={{ height: 30, width: 30,  }}
          />
        </TouchableOpacity>
      </View>
      )
  }


  function Nav(params) {
    return (
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
    )
  }


        const Engine40list = MatchsFromDB.map((match, index) =>{
    if (match.Competition === 'Engine 4.0') {
        return (
         <TouchableOpacity key={index} onPress={() => navigation.navigate('MatchInfo', {
                matchId: match.id
            })} style={styles.eachMatch}>
<View style={styles.eachMatchTeam}>

  <Text style={styles.eachMatchTeamTxt}>{match.HomeTeam}</Text>

 <Image
            source={require("../../assets/logo-01.png")}
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
            source={require("../../assets/logo-02.png")}
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
         <TouchableOpacity key={index} onPress={() => navigation.navigate('MatchInfo', {
                matchId: match.id
            })} style={styles.eachMatch}>
<View style={styles.eachMatchTeam}>

  <Text style={styles.eachMatchTeamTxt}>{match.HomeTeam}</Text>

 <Image
            source={require("../../assets/logo-01.png")}
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
            source={require("../../assets/logo-02.png")}
            resizeMode="contain"
            style={{ height: 45, width: 45,  }}
          />

  <Text style={styles.eachMatchTeamTxt}>{match.AwayTeam}</Text>

</View>
</TouchableOpacity>
        )
    }
  } )



  return (
    <SafeAreaView style={styles.container}>
        <Headers/>
        <Nav/>
     <ScrollView>


{competition===4 ? Engine40list
 
 :

Engine30list}
      


     </ScrollView>
    </SafeAreaView>
  )
}

export default MatchList

const styles = StyleSheet.create({
      container: {
        flex: 1,
    
        backgroundColor: "aliceblue",
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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


  headerTitleScore: {
    color:'#ff2782'
    , fontWeight:'500'
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
  alignItems: 'center',
  alignSelf: 'center',
//   paddingHorizontal: 10
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
          
  navMenu: {
  marginVertical:20,
  display: 'flex',
  flexDirection: 'row', 
  justifyContent: 'space-between',
  
  },

})