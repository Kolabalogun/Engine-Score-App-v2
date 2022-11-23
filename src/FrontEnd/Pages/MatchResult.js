import { Image, ScrollView, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { useGlobalContext } from "../../Function/Context";
import { useState } from "react";


const MatchResult = ({navigation}) => {
  const { MatchState } = useGlobalContext();

  const [activeMenu, activeMenuF] = useState('lineup')

  return (
    <ScrollView style={styles.container}>

      <View style={styles.matchTopBar}>
 <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{backgroundColor: 'aliceblue', opacity: 1, borderRadius: 50,}}>
        <Image
            source={require("../../../assets/ba.png")}
            resizeMode="cover"
            style={{ height: 30, width: 30,   }}
          />
        </TouchableOpacity>
        <View style={styles.headerTitleDiv}>
       <Text style={styles.headerTitle}>Engine 4.0</Text>
        </View>
        <TouchableOpacity style={{ borderRadius: 50,}} >
             <Image
            source={require("../../../assets/refresh.png")}
            resizeMode="cover"
            style={{ height: 25, width: 25,   }}
          />
        </TouchableOpacity>
      </View>
      </View>

      
 <View style={styles.dashboard}>

<View  style={styles.dashboardBox}>

  <Text style={styles.competitionName}>Maracana Field</Text>
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



<View style={styles.navMenu}>

  <TouchableOpacity onPress={()=> {activeMenuF('lineup')}} style={{ backgroundColor: activeMenu === 'lineup' ? '#ff2782' : '#fff'
    , 
    paddingHorizontal:10 ,
    paddingVertical:10,
    flex: 1,
    marginHorizontal: 20,
    alignItems: 'center',
    borderRadius: 20}}>
<Text style={{ color: activeMenu=== 'lineup' ? '#fff' : '#ff2782'
    , fontWeight:'500',
    fontSize:15}}>Line Up</Text>
  </TouchableOpacity>

  
  <TouchableOpacity onPress={()=> {activeMenuF('timeline')}} style={{ backgroundColor: activeMenu === 'timeline' ? '#ff2782' : '#fff'
    , 
    paddingHorizontal:10 ,
    paddingVertical:10,
    flex: 1,
    marginHorizontal: 20,
    alignItems: 'center',
    borderRadius: 20}}>
<Text style={{ color: activeMenu==='timeline' ? '#fff' : '#ff2782'
    , fontWeight:'500',
    fontSize:15}}>Summary</Text>
  </TouchableOpacity>
  
</View>


<View style={styles.formationSection}>
<View style={styles.teams}>
<View style={styles.team}>
    <Image
            source={require("../../../assets/logo-01.png")}
            resizeMode="contain"
            style={{ height: 35, width: 35  }}
          />

          <View style={styles.formation}>
<Text>Mechanical</Text>
<Text style={{color: '#aaa'}}>4-3-3</Text>
</View>
</View>
<View style={styles.team}>
    <Image
            source={require("../../../assets/logo-02.png")}
            resizeMode="contain"
            style={{ height: 35, width: 35  }}
          />

          <View style={styles.formation}>
<Text>Computer</Text>
<Text style={{color: '#aaa'}}>4-3-3</Text>
</View>
</View>
</View>


 <Image
            source={require("../../../assets/line.png")}
            resizeMode="contain"
            style={{ marginVertical: 10 }}
          />


          <Text style={styles.manager}>Manager</Text>

          <View style={styles.managerSplit}>
              <Text>Manager Name</Text>
              <Text>Manager Name</Text>
          </View>


          
          <Text style={styles.manager}>Lineups</Text>

          <View style={styles.lineups}>

            <View>
  <Text>Player 1</Text>
  <Text>Player 1</Text>
  <Text>Player 1</Text>
  <Text>Player 1</Text>
  <Text>Player 1</Text>
  <Text>Player 1</Text>
  <Text>Player 1</Text>
  <Text>Player 1</Text>
  <Text>Player 1</Text>
  <Text>Player 1</Text>
  <Text>Player 1</Text>


            </View>

            <View>
  <Text>Player 1</Text>
  <Text>Player 1</Text>
  <Text>Player 1</Text>
  <Text>Player 1</Text>
  <Text>Player 1</Text>
  <Text>Player 1</Text>
  <Text>Player 1</Text>
  <Text>Player 1</Text>
  <Text>Player 1</Text>
  <Text>Player 1</Text>
  <Text>Player 1</Text>
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

    homeHeader :{
display: 'flex',
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center'
  },

  headerTitle :{
fontSize:15,
fontWeight: '500',
color: 'white'

  },


   matchTopBar: {
    backgroundColor: 'purple',

    paddingHorizontal: 10,
    paddingTop: 10,

    height: 230,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

      },



  dashboard: {
   marginHorizontal:20,
   marginTop:-150
  
  },
  dashboardTitle: {
   fontSize: 18,
  fontWeight: '500'
  },

  
  dashboardBox: {
   marginBottom:10,
   marginTop: 10,
   backgroundColor:'white',
   alignItems:'center',
   borderRadius:10,
   padding: 15,

    // borderWidth: 3,
  

    // borderColor: 'rgba(209, 225, 240, 0.782)',
  
  },
  dashboardTitle: {
   fontSize: 18,
  fontWeight: '500'

  },


  competitionName: {
  color: 'black',
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
   color: 'black'
  },

   teamTxt: {
  color: 'black',
  paddingTop: 5
  },

   scoreTxt: {
  color: 'black',
  fontSize:48
  },

   navMenu: {
  marginVertical:15,
  display: 'flex',
  flexDirection: 'row', 
  justifyContent: 'space-between',
  
  },

  
  
   formationSection: {
 marginHorizontal: 20,

  },

     teams: {
 
 display: 'flex',
 flexDirection: 'row',
 justifyContent: 'space-between'
  },

  
     team: {
 
 display: 'flex',
 flexDirection: 'row',
 justifyContent: 'space-between'
  },

  
     manager: {
 
 fontWeight: '500',
 textAlign:'center'
  },

     managerSplit: {
 
 display: 'flex',
 flexDirection: 'row',
 justifyContent: 'space-between',
 paddingVertical:5
  },

  
     lineups: {
 
 display: 'flex',
 flexDirection: 'row',
 justifyContent: 'space-between',
 marginVertical: 10
  },

  
     manager: {
 
 fontWeight: '500',
 textAlign:'center'
  },
});
