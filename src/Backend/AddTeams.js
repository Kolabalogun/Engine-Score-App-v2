import { Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { useGlobalContext } from '../../Functions/Context';
// import { pickImage, uploadImgetoFireStorage } from '../../Utils/DisplayImage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
// import { auth, db, storage } from '../../Utils/Firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
// import Loader from '../../Components/Loader';
import { useGlobalContext } from '../Function/Context';
import { pickImage, uploadImgetoFireStorage } from '../Utils/DisplayImage';
import { db } from '../Utils/Firebase';
import Loader from '../FrontEnd/Components/Others/Loader';
import SelectDropdown from 'react-native-select-dropdown';
import Header from '../FrontEnd/Components/Others/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AddTeams = ({navigation}) => {

    const {competition, competitionF, notification, notificationF, currentUser, loader, loaderF, TeamsFromDB } = useGlobalContext();
  const [Competition, CompetitionF] = useState('');

  const competitionData = ['Engine 4.0', 'Engine 3.0']
  const GroupData = [1, 2]
  const formationData = ['4-4-2', '4-3-3', '4-2-3-1', '3-4-3', '3-5-2']

  const [TeamName, TeamNameF] = useState('');
 
  const [Players, PlayersF] = useState(
    {
goalkepper: '',
defender1: '',
defender2: '',
defender3: '',
defender4: '',
defender5: '',
midfielders1:'',
midfielders2:'',
midfielders3:'',
midfielders4:'',
midfielders5:'',
attakers1:'',
attakers2:'',
attakers3:'',
attakers4:'',
attakers5:'',
benchs1:'',
benchs2:'',
benchs3:'',
benchs4:'',

    });

   

    
  

    

    
    

  const [TeamGroup, TeamGroupF] = useState("");
  const [TeamManager, TeamManagerF] = useState("");
  const [Formation, FormationF] = useState("");
  const [selectedImage, selectedImageF] = useState(null);



  const [dateId, setdateId] = useState("");

    // to set timeId
    useEffect(() => {
        const dateId = new Date().getTime();
        const realTime = new Date().toLocaleTimeString()
        const realDate = new Date().toDateString()

        // TeamNameF(`${realDate} ${realTime}`);

        
        setdateId(dateId);
    }, []);

   




  const handleSubmit = async (e) => {
    e.preventDefault();
 


    if (TeamName && TeamManager  && Formation) {
        // if we adding new team
        loaderF(true);
let image = ''
        if (selectedImage) {
              
        const { url } = await uploadImgetoFireStorage(
          selectedImage,
          `images/${dateId}`,
          "profilePicture"
        );

        image = url
        }

      

        try {
            await addDoc(collection(db, "Teams"), {
                Competition: Competition,
                TeamName: TeamName,
                Players: Players,
                TeamLogo: image,
                TeamFormation: Formation,
                TeamGroup: TeamGroup,
             
                TeamManager:TeamManager,
                timestamp: serverTimestamp(),
             stat: {
              mp: '0',
      wins: '0',
      loss: '0',
      draw: '0',
      matchplayed:'0',
      gd:'0',
      points: '0'
    },
                dateId: dateId,
                
            });
            loaderF(false);
            notificationF("Team Successfully Added");
    TeamNameF('')
    TeamManagerF('')
    navigation.navigate("Team List");

        } catch (error) {
            // console.log(error);
            notificationF(error);
        }

      
    } else {
        return notificationF("All fields must be filled");
    }
    
    

};




  const Imagepicker = async () => {
    let result = await pickImage();
    if (!result.cancelled) {
    

      selectedImageF(result.uri);
    }
  };





 
  function navigateToListofTeam(params) {
    navigation.navigate('Team List')
  }


  function functions(params) {
          navigation.goBack();
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
    <>

    {
      loader ? <Loader/> :

      <SafeAreaView style={styles.container}>
   <View>
            <Headers functions = {navigateToListofTeam} imgtype={require("../../assets/list.png")}/>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topSection}>
          <Text style={styles.topText}>Add New Team</Text>
          <Text style={styles.capText}>
  Please input the details of the Team.
          </Text>
        </View>
  
        <KeyboardAvoidingView style={styles.Inputs}>
  
        <TouchableOpacity
                  onPress={Imagepicker}
                  style={{
                    height: 80,
                    width: 80,
  
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
  marginVertical: 20,
                    borderRadius: 120,
                  }}
                >
                  {!selectedImage ? (
                    <View style={{ alignSelf: "center" }}>
                      <Image
                        source={require("../../assets/photo.png")}
                        style={{
                          height: 100,
                          width: 100,
                        }}
                      />
                      <Text style={{width: '100%', textAlign: 'center'}}>Add Team Logo</Text>
                    </View>
                  ) : (
                    <Image
                      source={{ uri: selectedImage }}
                      style={{
                        height: "100%",
                        width: "100%",
  
                        borderRadius: 100,
                      }}
                    />
                  )}
                </TouchableOpacity>


             
  
  
  
  
          <View style={{ marginTop: 10 }}>
            <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
            Competition
            </Text>
            {/* <TextInput
              value={Competition}
              onChangeText={(e) => CompetitionF(e)}
              placeholder="Enter the Team Name"
            
              style={styles.Input}
            /> */}

               <SelectDropdown
	data={competitionData}
    

      defaultButtonText = 'Select Competition'
      buttonStyle={styles.dropdownStyle}
      buttonTextStyle={styles.dropdownStyleTxt}

	onSelect={(selectedItem, index) => {
	CompetitionF(selectedItem)
	}}
	
   
/>
          </View>
  
          <View style={{ marginTop: 10 }}>
            <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Team Name
            </Text>
            <TextInput
              value={TeamName}
              onChangeText={(e) => TeamNameF(e)}
              placeholder="Enter the Team Name"
            
              style={styles.Input}
            />
          </View>
  
          <View style={{ marginTop: 10 }}>
            <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
             Manager
            </Text>
            <TextInput
              value={TeamManager}
              onChangeText={(e) => TeamManagerF(e)}
              placeholder="Enter the Manager of the Team"
         
              style={styles.Input}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
             Team Formation
            </Text>
          
             <SelectDropdown
	data={formationData}
    

      defaultButtonText = 'Select Team Formation'
      buttonStyle={styles.dropdownStyle}
      buttonTextStyle={styles.dropdownStyleTxt}

	onSelect={(selectedItem, index) => {
	FormationF(selectedItem)
	}}
	
   
/> 
 

          </View>

             <View style={{ marginTop: 10 }}>
            <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
             Team Group
            </Text>
          
             <SelectDropdown
	data={GroupData}
    

      defaultButtonText = 'Select Team Group'
      buttonStyle={styles.dropdownStyle}
      buttonTextStyle={styles.dropdownStyleTxt}

	onSelect={(selectedItem, index) => {
	TeamGroupF(selectedItem)
	}}
	
   
/> 
 

          </View>


          <View style={{ marginTop: 10 }}>
            <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Players
            </Text>



 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              GoalKeeper
            </Text>

            <TextInput
              value={Players.goalkepper}
              name= 'goalkepper'
              onChangeText={(e) => PlayersF((prev) => {
                return{...prev, goalkepper :e};
               
              })}
              placeholder="Please enter GoalKeeper's Name"
             
              style={styles.InputTextArea}
   
  
            />
            
 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Defender
            </Text>

            <TextInput
              value={Players.defender1}
              name= 'defender1'
               onChangeText={(e) => {
                 
             teamInfoF({ ...teamInfo, Players : {
                ...Players,
                defender1:e
             } });
              }}
              placeholder="Please enter defender1's Name"
             
              style={styles.InputTextArea}
   
  
            />



 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Defender
            </Text>

            <TextInput
              value={Players.defender2}
              name= 'defender2'
               onChangeText={(e) => {
                 
             teamInfoF({ ...teamInfo, Players : {
                ...Players,
                defender2:e
             } });
              }}
              placeholder="Please enter defender2's Name"
             
              style={styles.InputTextArea}
   
  
            />



 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Defender
            </Text>

            <TextInput
              value={Players.defender3}
              name= 'defender3'
               onChangeText={(e) => {
                 
             teamInfoF({ ...teamInfo, Players : {
                ...Players,
                defender3:e
             } });
              }}
              placeholder="Please enter defender3's Name"
             
              style={styles.InputTextArea}
   
  
            />



 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Defender
            </Text>

            <TextInput
              value={Players.defender4}
              name= 'defender4'
               onChangeText={(e) => {
                 
             teamInfoF({ ...teamInfo, Players : {
                ...Players,
                defender4:e
             } });
              }}
              placeholder="Please enter defender4's Name"
             
              style={styles.InputTextArea}
   
  
            />



 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Defender
            </Text>

            <TextInput
              value={Players.defender5}
              name= 'defender5'
               onChangeText={(e) => {
                 
             teamInfoF({ ...teamInfo, Players : {
                ...Players,
                defender5:e
             } });
              }}
              placeholder="Please enter defender5's Name"
             
              style={styles.InputTextArea}
   
  
            />



 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Midfielders
            </Text>

            <TextInput
              value={Players.midfielders1}
              name= 'midfielders1'
               onChangeText={(e) => {
                 
             teamInfoF({ ...teamInfo, Players : {
                ...Players,
                midfielders1:e
             } });
              }}
              placeholder="Please enter midfielders1's Name"
             
              style={styles.InputTextArea}
   
  
            />



 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Midfielders
            </Text>

            <TextInput
              value={Players.midfielders2}
              name= 'midfielders1'
               onChangeText={(e) => {
                 
             teamInfoF({ ...teamInfo, Players : {
                ...Players,
                midfielders2:e
             } });
              }}
              placeholder="Please enter midfielders2's Name"
             
              style={styles.InputTextArea}
   
  
            />



 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Midfielders
            </Text>

            <TextInput
              value={Players.midfielders3}
              name= 'midfielders3'
               onChangeText={(e) => {
                 
             teamInfoF({ ...teamInfo, Players : {
                ...Players,
                midfielders3:e
             } });
              }}
              placeholder="Please enter midfielders3's Name"
             
              style={styles.InputTextArea}
   
  
            />



 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Midfielders
            </Text>

            <TextInput
              value={Players.midfielders4}
              name= 'midfielders4'
               onChangeText={(e) => {
                 
             teamInfoF({ ...teamInfo, Players : {
                ...Players,
                midfielders4:e
             } });
              }}
              placeholder="Please enter midfielders4's Name"
             
              style={styles.InputTextArea}
   
  
            />
        



 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Midfielders
            </Text>

            <TextInput
              value={Players.midfielders5}
              name= 'midfielders5'
               onChangeText={(e) => {
                 
             teamInfoF({ ...teamInfo, Players : {
                ...Players,
                midfielders5:e
             } });
              }}
              placeholder="Please enter midfielders5's Name"
             
              style={styles.InputTextArea}
   
  
            />



 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              attakers
            </Text>

            <TextInput
              value={Players.attakers1}
              name= 'attakers1'
               onChangeText={(e) => {
                 
             teamInfoF({ ...teamInfo, Players : {
                ...Players,
                attakers1:e
             } });
              }}
              placeholder="Please enter attakers1's Name"
             
              style={styles.InputTextArea}
   
  
            />



 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              attakers
            </Text>

            <TextInput
              value={Players.attakers2}
              name= 'attakers1'
               onChangeText={(e) => {
                 
             teamInfoF({ ...teamInfo, Players : {
                ...Players,
                attakers2:e
             } });
              }}
              placeholder="Please enter attakers2's Name"
             
              style={styles.InputTextArea}
   
  
            />



 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              attakers
            </Text>

            <TextInput
              value={Players.attakers3}
              name= 'attakers3'
               onChangeText={(e) => {
                 
             teamInfoF({ ...teamInfo, Players : {
                ...Players,
                attakers3:e
             } });
              }}
              placeholder="Please enter attakers3's Name"
             
              style={styles.InputTextArea}
   
  
            />



 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              attakers
            </Text>

            <TextInput
              value={Players.attakers4}
              name= 'attakers4'
               onChangeText={(e) => {
                 
             teamInfoF({ ...teamInfo, Players : {
                ...Players,
                attakers4:e
             } });
              }}
              placeholder="Please enter attakers4's Name"
             
              style={styles.InputTextArea}
   
  
            />
        



 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              attakers
            </Text>

            <TextInput
              value={Players.attakers5}
              name= 'attakers5'
               onChangeText={(e) => {
                 
             teamInfoF({ ...teamInfo, Players : {
                ...Players,
                attakers5:e
             } });
              }}
              placeholder="Please enter attakers5's Name"
             
              style={styles.InputTextArea}
   
  
            />


            

 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              benchs
            </Text>

            <TextInput
              value={Players.benchs1}
              name= 'benchs1'
               onChangeText={(e) => {
                 
             teamInfoF({ ...teamInfo, Players : {
                ...Players,
                benchs1:e
             } });
              }}
              placeholder="Please enter benchs1's Name"
             
              style={styles.InputTextArea}
   
  
            />



 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              benchs
            </Text>

            <TextInput
              value={Players.benchs2}
              name= 'benchs1'
               onChangeText={(e) => {
                 
             teamInfoF({ ...teamInfo, Players : {
                ...Players,
                benchs2:e
             } });
              }}
              placeholder="Please enter benchs2's Name"
             
              style={styles.InputTextArea}
   
  
            />



 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              benchs
            </Text>

            <TextInput
              value={Players.benchs3}
              name= 'benchs3'
               onChangeText={(e) => {
                 
             teamInfoF({ ...teamInfo, Players : {
                ...Players,
                benchs3:e
             } });
              }}
              placeholder="Please enter benchs3's Name"
             
              style={styles.InputTextArea}
   
  
            />



 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              benchs
            </Text>

            <TextInput
              value={Players.benchs4}
              name= 'benchs4'
               onChangeText={(e) => {
                 
             teamInfoF({ ...teamInfo, Players : {
                ...Players,
                benchs4:e
             } });
              }}
              placeholder="Please enter benchs4's Name"
             
              style={styles.InputTextArea}
   
  
            />


           
          </View>
  
        </KeyboardAvoidingView>
        <Text style={{ color: "red", alignSelf: "center", padding: 3,  }}>
          {notification}
        </Text>
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnTxt}>Save</Text>
        </TouchableOpacity>
  
  
      </ScrollView>
      </View>

    


    </SafeAreaView>
      
    }
    
    </>

 
  )
}

export default AddTeams;

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
        marginBottom: 50
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