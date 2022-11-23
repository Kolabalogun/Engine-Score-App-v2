import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../Function/Context';
import Header from '../FrontEnd/Components/Others/Header';
import SelectDropdown from 'react-native-select-dropdown';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Utils/Firebase';



const initialState={
    Competition: '',
    TeamName:'',
    Players:   {
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

    },

    TeamManager: '',
    TeamFormation: '',
    selectedImage: null,


}

const MatchInfo = ({route, navigation}) => {

  const {competition, competitionF, notification, notificationF, currentUser, loader, loaderF, TeamsFromDB, TeamsFromDBF } = useGlobalContext();


      const { teamId } = route.params;

      const [teamInfo, teamInfoF] =useState(initialState)


      useEffect(() => {
    teamId && getBlogDetail();
  }, [teamId]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "Teams", teamId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      teamInfoF({ ...snapshot.data() });
    }
  };


  const{   Competition,
    TeamName,
    Players,

    TeamManager,
    TeamFormation,
    selectedImage,} = teamInfo









  const competitionData = ['Engine 4.0', 'Engine 3.0']
  const formationData = ['4-4-2', '4-3-3', '4-2-3-1', '3-4-3', '3-5-2']


 
 

   




  const [dateId, setdateId] = useState("");

    // to set timeId
    useEffect(() => {
        const dateId = new Date().getTime();
        const realTime = new Date().toLocaleTimeString()
        const realDate = new Date().toDateString()

        // TeamNameF(`${realDate} ${realTime}`);

        
        setdateId(dateId);
    }, []);

   



  const Imagepicker = async () => {
    let result = await pickImage();
    if (!result.cancelled) {

        
     teamInfoF((prev) => ({ ...prev, selectedImage: result.uri }));
    

    }
  };


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

      


  return (
    <SafeAreaView style={styles.container}>
        <Header/>

 <ScrollView  showsVerticalScrollIndicator={false}>
        <View style={styles.topSection}>
          <Text style={styles.topText}>Edit Team</Text>
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

               <SelectDropdown
	data={competitionData}
    defaultValue={Competition}

      defaultButtonText = 'Select Competition'
      buttonStyle={styles.dropdownStyle}
      buttonTextStyle={styles.dropdownStyleTxt}

	onSelect={(selectedItem, index) => {
	// CompetitionF(selectedItem)

     teamInfoF((prev) => ({ ...prev, Competition: selectedItem }));
	}}
	
   
/>
          </View>
  
          <View style={{ marginTop: 10 }}>
            <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Team Name
            </Text>
            <TextInput
              value={TeamName}
              onChangeText={(e) => {
             
             teamInfoF({ ...teamInfo, TeamName: e });
              }}
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
              onChangeText={(e) => {
                 
             teamInfoF({ ...teamInfo, TeamManager: e });
              }}
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
    defaultValue={TeamFormation}

      defaultButtonText = 'Select Team Formation'
      buttonStyle={styles.dropdownStyle}
      buttonTextStyle={styles.dropdownStyleTxt}

	onSelect={(selectedItem, index) => {
	// FormationF(selectedItem)
    
     teamInfoF((prev) => ({ ...prev, TeamFormation: selectedItem }));
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
               onChangeText={(e) => {
                 
             teamInfoF({ ...teamInfo, Players : {
                ...Players,
                goalkepper:e
             } });
              }}
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


  
    </SafeAreaView>
  )
}

export default MatchInfo

const styles = StyleSheet.create({
    container: {
        flex: 1,
    
        backgroundColor: "aliceblue",
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          paddingHorizontal: 20,
          paddingTop: 10
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
})