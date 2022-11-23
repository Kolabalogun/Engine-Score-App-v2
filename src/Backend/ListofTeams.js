import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../Function/Context';

const ListofTeams = ({navigation}) => {

       const { competition, competitionF,  notification, notificationF, currentUser, loader, loaderF, TeamsFromDB, handleDeleteTeam } = useGlobalContext();


        function navigateToAddNewTeam(params) {
    navigation.navigate('Add Teams')
  }

      const Engine40list = TeamsFromDB.map((teams, index) =>{
    if (teams.Competition === 'Engine 4.0') {
        return (
            <TouchableOpacity key={index}  onPress={() => navigation.navigate('EditTeams', {
                teamId: teams.id
            })} style={styles.eachMatch}>
<View style={styles.eachMatchTeam}>

  <Text style={styles.eachMatchTeamTxt}>{teams.TeamName}</Text>

 {/* <Image
            source={require("../../../assets/logo-01.png")}
            resizeMode="contain"
            style={{ height: 45, width: 45,  }}
          /> */}


</View>

<View style={styles.eachMatchTeam}>

  <TouchableOpacity onPress={() => handleDeleteTeam(teams.id)} style={{backgroundColor: 'red', borderRadius: 10}}>
    <Text style={{color: 'white', padding: 7, }}>Delete Team</Text>
  </TouchableOpacity>
</View>
</TouchableOpacity>
        )
    }
  } )
      const Engine30list = TeamsFromDB.map((teams, index) =>{
    if (teams.Competition === 'Engine 3.0') {
        return (
            <TouchableOpacity key={index}  onPress={() => navigation.navigate('EditTeams', {
                teamId: teams.id
            })} style={styles.eachMatch}>
<View style={styles.eachMatchTeam}>

  <Text style={styles.eachMatchTeamTxt}>{teams.TeamName}</Text>

 {/* <Image
            source={require("../../../assets/logo-01.png")}
            resizeMode="contain"
            style={{ height: 45, width: 45,  }}
          /> */}


</View>

<View style={styles.eachMatchTeam}>

  <TouchableOpacity onPress={() => handleDeleteTeam(teams.id)} style={{backgroundColor: 'red', borderRadius: 10}}>
    <Text style={{color: 'white', padding: 7, }}>Delete Team</Text>
  </TouchableOpacity>
</View>
</TouchableOpacity>
        )
    }
  } )



 function Headers({functions, imgtype}) {
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
        <TouchableOpacity onPress={functions} style={styles.profilePic}>
        <Image
            source={imgtype}
            resizeMode="cover"
            style={{ height: 30, width: 30,  }}
          />
        </TouchableOpacity>
      </View>
      )
  }


  return (
       <SafeAreaView style={styles.container}>
        <Headers functions = {navigateToAddNewTeam} imgtype={require("../../assets/add.png")}/>
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


{competition===4 ? Engine40list
 
 :

Engine30list}

</SafeAreaView>

  )
}

export default ListofTeams

const styles = StyleSheet.create({
      container: {
        flex: 1,
    
        backgroundColor: "aliceblue",
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          paddingHorizontal: 20,
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
        alignItems: 'baseline',
        justifyContent: 'flex-start',
     
        textAlignVertical: 'top'
       
      
      },
      btn: {
        paddingVertical: 12,
        backgroundColor: "rgb(20, 119, 251)",
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

        width: '100%',
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 13,
        borderColor: "#aaa",
        backgroundColor: 'white',
        height:40   
      },
      dropdownStyleTxt: {
 fontSize: 14
      },

        
  navMenu: {
  marginVertical:20,
  display: 'flex',
  flexDirection: 'row', 
  justifyContent: 'space-between',
  
  },

    eachMatch: {
   borderRadius: 10,
   backgroundColor:'white',flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   paddingHorizontal: 10,
   paddingVertical:10,
   marginVertical:5,
   borderWidth: 3,
  
    alignItems: 'center',

    borderColor: 'rgba(209, 225, 240, 0.782)',
    
  },

   eachMatchTeam: {
//    flex:1,
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
 fontWeight: '500',
 fontSize: 15
  },
})