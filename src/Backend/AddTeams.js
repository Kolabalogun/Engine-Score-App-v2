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

const AddTeams = () => {

    const { notification, notificationF, navigation, currentUser, loader, loaderF, TeamsFromDB, TeamsFromDBF } = useGlobalContext();
  const [Competition, CompetitionF] = useState('');

  const competitionData = ['Engine 4.0', 'Engine 3.0']
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

   

    
  const [competition, competitionF] = useState(4)

    

    
    

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

   

     const handleChange = (e) => {
    PlayersF((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };



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
             
                TeamManager:TeamManager,
                timestamp: serverTimestamp(),
                // author: currentUser.email,
                // userId: currentUser.uid,
                dateId: dateId,
                
            });
            loaderF(false);

        } catch (error) {
            // console.log(error);
            notificationF(error);
        }

      
    } else {
        return notificationF("All fields must be filled");
    }
    // navigation.navigate("Home");
    notificationF("Team Successfully Added");
    TeamNameF('')
    TeamManagerF('')

};




  const Imagepicker = async () => {
    let result = await pickImage();
    if (!result.cancelled) {
    

      selectedImageF(result.uri);
    }
  };



//   const Engine40list = TeamsFromDB.map((teams, index) => teams.)


  function navigateToAddNewTeam(params) {
    navigation.navigate('AddNewTeam')
  }
  function navigateToListofTeam(params) {
    navigation.navigate('ListofTeam')
  }




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



  function AddNewTeam(params) {

    return (
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
            {/* <TextInput
              value={Formation}
              onChangeText={(e) => FormationF(e)}
              placeholder="Enter Team's Formation"
         
              style={styles.Input}
            /> */}
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
      )
  }
  function ListofTeam(params) {
    return(
        <View>
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
</View>
    )
  }



  const stack = createNativeStackNavigator();


  return (
    <>

    {
      loader ? <Loader/> :

      <SafeAreaView style={styles.container}>
<stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
            <stack.Screen name="ListofTeam" component={ListofTeam} />
      <stack.Screen name="AddNewTeam" component={AddNewTeam} />

    </stack.Navigator>

    


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

})