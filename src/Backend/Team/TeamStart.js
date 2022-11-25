import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { doc } from 'firebase/firestore';
import { db } from '../../Utils/Firebase';


const initialState={
    Competition: '',
    TeamName:'',
   
    stat: {
      wins: '',
      loss: '',
      draw: '',
      matchplayed:'',
      gd:'',
      points: ''
    },


}

const TeamStart = ({route, navigation}) => {

     const { teamId } = route.params;

     const [teamInfo, teamInfoF] =useState(initialState)

     console.log(teamId);

  //        useEffect(() => {
  //   teamId && getBlogDetail();
  // }, [teamId]);

  // const getBlogDetail = async () => {
  //   const docRef = doc(db, "Teams", teamId);
  //   const snapshot = await getDoc(docRef);
  //   if (snapshot.exists()) {
  //     teamInfoF({ ...snapshot.data() });
  //   }
  // };

  const{   Competition,
    TeamName,
  stat} = teamInfo

  const [count, countF] = useState([])

    
  const handleSubmit = async (e) => {
    
      e.preventDefault();

      if (teamInfo) {

        try {
          await updateDoc(doc(db, "Teams", teamId), {
            ...teamInfo
          });
  navigation.navigate("Team List");
        } catch (err) {
          console.log(err);
        }
      } else {
        return notificationF("field must be filled");
      }
    
 

  }


         function Headers({functions, imgtype}) {
    return(
       <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() =>{
          navigation.goBack()
        }} style={styles.profilePic}>
        <Image
            source={require("../../assets/ba.png")}
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
    <View style={styles.container}>
        <Headers/>
      <Text style={{fontSize: 80}}>{teamId}</Text>

        <View style={{ marginTop: 10 }}>

 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Team
            </Text>

            <TextInput
              // value={MatchDate}
              name= 'goalkepper'
              readonly={true}
              placeholder="Enter Date e.g (20 Jan)"
             maxLength={6}
              style={styles.InputTextArea}
   
  
            />
          </View>
    </View>
  )
}

export default TeamStart

const styles = StyleSheet.create({  container: {
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

      }
    })