import { Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { useGlobalContext } from '../../Functions/Context';
// import { pickImage, uploadImgetoFireStorage } from '../../Utils/DisplayImage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
// import { auth, db, storage } from '../../Utils/Firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
// import Loader from '../../Components/Loader';
import { useGlobalContext } from '../../Function/Context';
import { pickImage, uploadImgetoFireStorage } from '../../Utils/DisplayImage';
import { db } from '../../Utils/Firebase';
import Loader from '../../FrontEnd/Components/Others/Loader';
import SelectDropdown from 'react-native-select-dropdown';
import Header from '../../FrontEnd/Components/Others/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const CreateMatch = ({navigation}) => {

    const {TeamsFromDB, notification, notificationF, currentUser, loader, loaderF, } = useGlobalContext();


  const [Competition, CompetitionF] = useState('');
    const [TeamData, TeamDataF] = useState([]);

    useEffect(() => {
      const data = TeamsFromDB.filter((team, index) => team.Competition === Competition)

TeamDataF(data.map(d => d.TeamName))

    }, [Competition, TeamsFromDB])
    

    




  const competitionData = ['Engine 4.0', 'Engine 3.0']
  const formationData = ['4-4-2', '4-3-3', '4-2-3-1', '3-4-3', '3-5-2']

  const [HomeTeam, HomeTeamF] = useState('');
  const [HomeTeamFormation, HomeTeamFormationF] = useState('');
 
  const [MatchDate, MatchDateF] = useState('');
  const [MatchDay, MatchDayF] = useState('');

  
  const [AwayTeam, AwayTeamF] = useState("");
  const [AwayTeamFormation, AwayTeamFormationF] = useState("");
  const [Matchtime, MatchtimeF] = useState("");
 



  const [dateId, setdateId] = useState("");

    // to set timeId
    useEffect(() => {
        const dateId = new Date().getTime();
        const realTime = new Date().toLocaleTimeString()
        const realDate = new Date().toDateString()

        // HomeTeamF(`${realDate} ${realTime}`);

        
        setdateId(dateId);
    }, []);

   




  const handleSubmit = async (e) => {
    e.preventDefault();
 


    if (
      HomeTeam &&
      AwayTeam &&
      Competition &&
      HomeTeamFormation &&
      MatchDate &&
      Matchtime &&
      AwayTeamFormation &&
      MatchDay
    ) {
      // if we adding new team
      loaderF(true);

      try {
        await addDoc(collection(db, "Matchs"), {
          Competition: Competition,
          HomeTeam: HomeTeam,
          MatchDate: MatchDate,
          HomeTeamFormation: HomeTeamFormation,
          AwayTeamFormation: AwayTeamFormation,
          HomeTeamScore: 0,
          AwayTeamScore: 0,
          MatchTimeline: [],
          MatchActive: false,

          AwayTeam: AwayTeam,
          Matchtime: Matchtime,

          MatchDay: MatchDay,

          // author: currentUser.email,
          // userId: currentUser.uid,
          dateId: dateId,
        });
    
        notificationF("Team Successfully Added");
        HomeTeamF("");
        AwayTeamF("");
        navigation.navigate("MatchList");
            loaderF(false);
      } catch (error) {
        // console.log(error);
        notificationF(error);
      }
    } else {
      return notificationF("All fields must be filled");
    }
    
    

};







 
  function navigateToListofTeam(params) {
    navigation.navigate('Team List')
  }





  function Headers({functions, imgtype}) {
    return(
       <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() =>{
          navigation.goBack();
        }} style={styles.profilePic}>
        <Image
            source={require("../../../assets/ba.png")}
            resizeMode="cover"
            style={{ height: 20, width: 20,  }}
          />
        </TouchableOpacity>
        <View style={styles.headerTitleDiv}>
       <Text style={styles.headerTitle}>Engine <Text style={styles.headerTitleScore} >Scores</Text></Text>
        </View>
        <TouchableOpacity onPress={functions} style={styles.profilePic}>
        {/* <Image
            source={imgtype}
            resizeMode="cover"
            style={{ height: 30, width: 30,  }}
          /> */}
        </TouchableOpacity>
      </View>
      )
  }





  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <SafeAreaView style={styles.container}>
          <View>
            <Headers
              functions={navigateToListofTeam}
              imgtype={require("../../../assets/list.png")}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.topSection}>
                <Text style={styles.topText}>Create Match</Text>
                <Text style={styles.capText}>
                  Please input the Match Details.
                </Text>
              </View>

              <KeyboardAvoidingView style={styles.Inputs}>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Competition
                  </Text>

                  <SelectDropdown
                    data={competitionData}
                    defaultButtonText="Select Competition"
                    buttonStyle={styles.dropdownStyle}
                    buttonTextStyle={styles.dropdownStyleTxt}
                    onSelect={(selectedItem, index) => {
                      CompetitionF(selectedItem);
                    }}
                  />
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Home Team
                  </Text>

                  <SelectDropdown
                    data={TeamData}
                    defaultButtonText="Please select Home Team"
                    buttonStyle={styles.dropdownStyle}
                    buttonTextStyle={styles.dropdownStyleTxt}
                    onSelect={(selectedItem, index) => {
                      HomeTeamF(selectedItem);
                    }}
                  />
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Away Team
                  </Text>

                  <SelectDropdown
                    data={TeamData}
                    defaultButtonText="Please select Away Team"
                    buttonStyle={styles.dropdownStyle}
                    buttonTextStyle={styles.dropdownStyleTxt}
                    onSelect={(selectedItem, index) => {
                      AwayTeamF(selectedItem);
                    }}
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Home Team Formation
                  </Text>

                  <SelectDropdown
                    data={formationData}
                    defaultButtonText="Select Home Team Formation"
                    buttonStyle={styles.dropdownStyle}
                    buttonTextStyle={styles.dropdownStyleTxt}
                    onSelect={(selectedItem, index) => {
                      HomeTeamFormationF(selectedItem);
                    }}
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Away Team Formation
                  </Text>

                  <SelectDropdown
                    data={formationData}
                    defaultButtonText="Select Away Team Formation"
                    buttonStyle={styles.dropdownStyle}
                    buttonTextStyle={styles.dropdownStyleTxt}
                    onSelect={(selectedItem, index) => {
                      AwayTeamFormationF(selectedItem);
                    }}
                  />
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Matchday
                  </Text>

                  <TextInput
                    value={MatchDay}
                    name="goalkepper"
                    onChangeText={(e) => MatchDayF(e)}
                    placeholder="MatchDay"
                    maxLength={2}
                    style={styles.InputTextArea}
                    keyboardType="decimal-pad"
                  />
                </View>

                <View style={{flexDirection: 'row',}}>
                  <View style={{ flex: 1, marginTop: 10 }}>
                    <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                      Date
                    </Text>

                    <TextInput
                      value={MatchDate}
                      name="goalkepper"
                      onChangeText={(e) => MatchDateF(e)}
                      placeholder="Enter Date e.g (20 Jan)"
                      maxLength={6}
                      style={styles.InputTextArea}
                    />
                  </View>

                  <View style={{ flex: 1, marginTop: 10 }}>
                    <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                      Time
                    </Text>

                    <TextInput
                      value={Matchtime}
                      name="goalkepper"
                      onChangeText={(e) => MatchtimeF(e)}
                      placeholder="Enter Time e.g (03:00)"
                      maxLength={5}
                      style={styles.InputTextArea}
                    />
                  </View>
                </View>
              </KeyboardAvoidingView>
              <Text style={{ color: "red", alignSelf: "center", padding: 3 }}>
                {notification}
              </Text>
              <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btnTxt}>Save</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </>
  );
}

export default CreateMatch;

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
alignItems: 'center',
  backgroundColor: "edeff2",
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

       
      
      },
      btn: {
        paddingVertical: 12,
        backgroundColor: "#ff2782",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        width: "100%",
        marginBottom: 30,
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