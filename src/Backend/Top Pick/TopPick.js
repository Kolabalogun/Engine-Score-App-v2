import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../Function/Context'
import SelectDropdown from 'react-native-select-dropdown'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../Utils/Firebase'


const initialState={

    Competition: '',

HomeTeam: '',
HomeTeamFormation: '',
MatchDate: '',
AwayTeam: '',
AwayTeamFormation:'',
Matchtime:'',
HomeTeamScore: 0,
                AwayTeamScore: 0,
                MatchTimeline:'',
                MatchActive: false,

}

const TopPick = ({navigation}) => {

  

    const {competition, competitionF, MatchsFromDB, notification, notificationF, loaderF} = useGlobalContext()

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


  

  const [MatchData, MatchDataF] = useState([])

  const [MatchSelect, MatchSelectF] = useState(initialState)

      const{      Competition,

HomeTeam,
HomeTeamFormation,
MatchDate,
AwayTeam,
AwayTeamFormation,
Matchtime,
HomeTeamScore,
                AwayTeamScore,
                MatchTimeline,
                MatchActive,
} = MatchSelect

  

   const [CompetitionState, CompetitionStateF] = useState('Engine 4.0');


   useEffect(() => {
    
    const data = MatchsFromDB.filter(match => match.Competition === CompetitionState)

MatchDataF(data)

   }, [CompetitionState])
   



   const handleSubmit = async (e) => {
    e.preventDefault();


    if (Competition === 'Engine 4.0') {
        if (MatchSelect) {

        try {
         await updateDoc(doc(db, "Top Pick", 'FReTe1WrlShEj1CQmlTR'), {
               Competition: Competition,
               MatchSelect: MatchSelect
                
            });
            loaderF(false);
            notificationF("Team Successfully Added");
 
    navigation.navigate("Home");

        } catch (error) {
            // console.log(error);
            notificationF(error);
        }

      
    } else {
        return notificationF("All fields must be filled");
    }
    }

    else {
        if (MatchSelect) {

        try {
         await updateDoc(doc(db, "Top Pick", 'ZBKXoFBPpW6BOxIhyRBr'), {
               Competition: Competition,
               MatchSelect: MatchSelect
                
            });
            loaderF(false);
            notificationF("Team Successfully Added");
 
    navigation.navigate("Home");

        } catch (error) {
            // console.log(error);
            notificationF(error);
        }

      
    } else {
        return notificationF("All fields must be filled");
    }
    }
 


  
    
   

};




  return (
    <View style={styles.container}>

        <Headers/>
       <View style={styles.navMenu}>

  <TouchableOpacity onPress={()=> {competitionF(4)
  CompetitionStateF('Engine 4.0')
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
CompetitionStateF('Engine 3.0')  
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

   <View style={{ marginTop: 10 }}>

 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Competition
            </Text>

            <TextInput
              value={CompetitionState}

              readonly = {true}
              placeholder="Competition"
    
              style={styles.InputTextArea}
   
  
            />
          </View>

              <View style={{ marginTop: 10 }}>
            <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Select Match
            </Text>

    <SelectDropdown
	data={MatchData}


      defaultButtonText ={'Select Match'}
      buttonStyle={styles.dropdownStyle}
      buttonTextStyle={styles.dropdownStyleTxt}

	onSelect={(selectedItem, index) => {
	MatchSelectF(selectedItem);
	}}
	
   
/>
          
          </View>




          <View  style={styles.dashboardBox}>

  <Text style={styles.competitionName}>Maracana Field</Text>
  <Text style={styles.matchDay}>Matchday One</Text>
  

  <View  style={styles.scoreBoard}>
      <View  style={styles.teamBoard}>

         <Image
            source={require("../../assets/logo-01.png")}
            resizeMode="contain"
            style={{ height: 90, width: 90 }}
          />

              <Text style={styles.teamTxt}>{HomeTeam}</Text>
    
  </View> 
   <View  style={styles.score}>
    {
      MatchActive ? <>
      <Text style = {styles.scoreTxt}>{HomeTeamScore}</Text>
      <Text style = {styles.scoreTxt}>:</Text>
        <Text style = {styles.scoreTxt}>{AwayTeamScore}</Text>
        </> :
        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1}}>
         <Text style={styles.eachMatchTeamTime}>{Matchtime}</Text>
         <Text style={{  color:'white',
  fontWeight:'500',
  fontSize: 15}}>{'vs'}</Text>
  <Text style={styles.eachMatchTeamDate}>{MatchDate}</Text>

        </View>
    }
  </View>
    <View  style={styles.teamBoard}>
        <Image
            source={require("../../assets/logo-02.png")}
            resizeMode="contain"
            style={{ height: 90, width: 90 }}
          />

              <Text style={styles.teamTxt}>{AwayTeam}</Text>
  </View>
  </View>


</View> 

       <Text style={{ color: "red", alignSelf: "center", padding: 3,  }}>
          {notification}
        </Text>

   <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnTxt}>Save</Text>
        </TouchableOpacity>


    </View>
  )
}

export default TopPick

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

   navMenu: {
  marginVertical:20,
  display: 'flex',
  flexDirection: 'row', 
  justifyContent: 'space-between',
  
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

      eachMatchTeamTime: {
  color:'white',
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

      btn: {
        paddingVertical: 12,
        backgroundColor: "rgb(20, 119, 251)",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        width: "100%",
        marginVertical: 20,
        marginBottom: 50
      },
      btnTxt: {
        color: "white",
        fontSize: 16,
        fontWeight: "500",
      },


})