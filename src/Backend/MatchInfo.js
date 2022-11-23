import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../Function/Context';
import Header from '../FrontEnd/Components/Others/Header';
import SelectDropdown from 'react-native-select-dropdown';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Utils/Firebase';



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

const MatchInfo = ({route, navigation}) => {

  const {competition, competitionF, notification, notificationF, currentUser, loader, loaderF, TeamsFromDB, TeamsFromDBF } = useGlobalContext();


      const { matchId } = route.params;

      const [matchhInfo, matchhInfoF] =useState(initialState)


      useEffect(() => {
    matchId && getBlogDetail();
  }, [matchId]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "Matchs", matchId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      matchhInfoF({ ...snapshot.data() });
    }
  };


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
} = matchhInfo











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

   





  const handleSubmit = async (e) => {
    
      e.preventDefault();

      if (matchhInfo) {

        try {
          await updateDoc(doc(db, "Matchs", matchId), {
            ...matchhInfo
          });
  navigation.navigate("MatchList");
        } catch (err) {
          console.log(err);
        }
      } else {
        return notificationF("field must be filled");
      }
    
 

  }





//   Notification 

//   Notification 

      


  return (
    <SafeAreaView style={styles.container}>
        <Header/>

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
            <TextInput
              value={Competition}  
              readonly={true}
              placeholder="Competition"
             
              style={styles.InputTextArea}
            />
          </View>


          <View style={{ marginTop: 10 }}>
            <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Start Match
            </Text>

    <SelectDropdown
	data={['Yes']}


      defaultButtonText ={ MatchActive? 'Yes' : 'Please select to Start Match'}
      buttonStyle={styles.dropdownStyle}
      buttonTextStyle={styles.dropdownStyleTxt}

	onSelect={(selectedItem, index) => {
	matchhInfoF((prev) => ({ ...prev, MatchActive: true }));
	}}
	
   
/>

          
          </View>



          <View style={{flexDirection:'row', justifyContent: 'space-between'} }>
          <View style={{ marginTop: 10, flex: 1 }}>
            <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
            Home Team
            </Text>
            <TextInput
              value={HomeTeam}  
              readonly={true}
              placeholder="Home Team"
             
              style={styles.InputTextArea}
            />
          </View>
          <View style={{ marginTop: 10, flex: 1 }}>
            <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
            Away Team
            </Text>
            <TextInput
              value={AwayTeam}  
              readonly={true}
              placeholder="Away Team"
             
              style={styles.InputTextArea}
            />
          </View>
</View>


  
  





    <View style={{flexDirection:'row', justifyContent: 'space-between'} }>
         
          <View style={{ marginTop: 10, flex: 1 }}>
            <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
            Home Team Formation
            </Text>
         
             <SelectDropdown
	data={formationData}
    defaultValue={HomeTeamFormation}
    

      defaultButtonText = 'Select Home Team Formation'
      buttonStyle={styles.dropdownStyle}
      buttonTextStyle={styles.dropdownStyleTxt}

	onSelect={(selectedItem, index) => {
	matchhInfoF((prev) => ({ ...prev, HomeTeamFormation: selectedItem }));
	}}
	
   
/>
          </View>
          <View style={{ marginTop: 10, flex: 1 }}>
            <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
            Away Team Formation
            </Text>
         
             <SelectDropdown
	data={formationData}
    defaultValue={AwayTeamFormation}
    

      defaultButtonText = 'Select Away Team Formation'
      buttonStyle={styles.dropdownStyle}
      buttonTextStyle={styles.dropdownStyleTxt}

	onSelect={(selectedItem, index) => {
	matchhInfoF((prev) => ({ ...prev, AwayTeamFormation: selectedItem }));
	}}
	
   
/>
          </View>

                 </View>




  <View style={{flexDirection:'row', justifyContent: 'space-between'} }>
          <View style={{ marginTop: 10, flex: 1 }}>

 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Home Team Score
            </Text>

            <TextInput
              value={HomeTeamScore}
            
                      onChangeText={(e) => {
             
             matchhInfoF({ ...matchhInfo, HomeTeamScore: e });
              }}
              placeholder="0"
             maxLength={2}
              style={styles.InputTextArea}
   keyboardType={'decimal-pad'}
  
            />
          </View>

          <View style={{ marginTop: 10, flex: 1 }}>

 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Away Team Score
            </Text>

            <TextInput
              value={AwayTeamScore}
            
                    onChangeText={(e) => {
             
             matchhInfoF({ ...matchhInfo, AwayTeamScore: e });
              }}
              placeholder="0"
             maxLength={2}
              style={styles.InputTextArea}
   keyboardType={'decimal-pad'}
  
            />
          </View>

          </View>
  <View style={{flexDirection:'row', justifyContent: 'space-between'} }>
          <View style={{ marginTop: 10, flex: 1 }}>

 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Date
            </Text>

            <TextInput
              value={MatchDate}
                     onChangeText={(e) => {
             
             matchhInfoF({ ...matchhInfo, MatchDate: e });
              }}
              placeholder="Enter Date e.g (20 Jan)"
             maxLength={6}
              style={styles.InputTextArea}
   
  
            />
          </View>

          <View style={{ marginTop: 10, flex: 1 }}>

 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Time
            </Text>

            <TextInput
              value={Matchtime}
            
                   onChangeText={(e) => {
             
             matchhInfoF({ ...matchhInfo, Matchtime: e });
              }}
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
     
        // textAlignVertical: 'top'
       
      
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