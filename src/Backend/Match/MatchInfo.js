import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useGlobalContext } from '../../Function/Context';
import Header from '../../FrontEnd/Components/Others/Header';
import SelectDropdown from 'react-native-select-dropdown';
import { addDoc, arrayUnion, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Utils/Firebase';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';



const initialState={

    Competition: '',

HomeTeam: '',
HomeTeamFormation: '',
MatchDate: '',
AwayTeam: '',
AwayTeamFormation:'',
Matchtime:'',
HomeTeamScore: '',
                AwayTeamScore: '',
                MatchTimeline:[],
                MatchActive: false,
                id: ''

}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const MatchInfo = ({route, navigation}) => {


    // Notifications
      const [expoPushToken, setExpoPushToken] = useState('');
  const [notificationn, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
    // Notifications

  const {competition, competitionF, notification, notificationF, handleDeleteMatch, loader, loaderF, TeamsFromDB, } = useGlobalContext();


      const { matchId } = route.params;

      const [matchhInfo, matchhInfoF] =useState(initialState)


      useEffect(() => {
    matchId && getBlogDetail();
  }, [matchId]);

      useEffect(() => {
   MatchNoteF(`${HomeTeamScore} - ${AwayTeamScore}`)
  }, [matchhInfo]);

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
                id
} = matchhInfo




const [notificationBody, notificationBodyF] = useState(null)
const [notificationNote, notificationNoteF] = useState('')

const [MatchBody, MatchBodyF] = useState(null)

const [MatchNote, MatchNoteF] = useState(`${HomeTeamScore} - ${AwayTeamScore}`)

const notes = ['Match Starts in Few Minutes. Who will win?', 'Match Started',`Goal ${HomeTeam} ${HomeTeamScore} - ${AwayTeamScore} ${AwayTeam}`, `Halftime ${HomeTeamScore} - ${AwayTeamScore}`, `Full Time ${HomeTeamScore} - ${AwayTeamScore}`]
const Matchnotes = ['Match Started', 'Goal',  'Yellow Card', 'Substitution',`Red Card`, 'Half Time', `Full Time`]


  const formationData = ['4-4-2', '4-3-3', '4-2-3-1', '3-4-3', '3-5-2']


 
 

   
// console.log(matchhInfo);



  const [dateId, setdateId] = useState("");

    // to set timeId
    useEffect(() => {
        const dateId = new Date().getTime();
        
        setdateId(dateId);
    }, []);

   




  const handleSubmit = async (e) => {
    
      e.preventDefault();

      if (matchhInfo) {

        try {
          await updateDoc(doc(db, "Matchs", matchId), {
            ...matchhInfo,
            MatchTimeline: [
                ...MatchTimeline,
                {MatchBody, MatchNote}
            ]

          });

          if (notificationBody) {
             await schedulePushNotification();
          }

          SendNotificationToAllUsers()

            
  navigation.navigate("MatchList");
        } catch (err) {
          console.log(err);
        }
      } else {
        return notificationF("field must be filled");
      }
    
 

  }



  

    
  const [UsersToken, UsersTokenF] = useState(['']);
  const [UsersList, UsersListF] = useState(['']);

      useEffect(() => {
  getUserDetail();
  }, []);


  const getUserDetail = async () => {
    const docRef = doc(db, "Users",  'Vgp5x0EfVAXtx8JM7yGx');
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      UsersListF( [...snapshot.data().expoPushTokenFB] );
      UsersTokenF( {...snapshot.data()} );
    }
  };



 const handleSendUserTokentoDB = async () => {
if (expoPushToken !== '') {

        try {
         await updateDoc(doc(db, "Users", 'Vgp5x0EfVAXtx8JM7yGx'), {
          ...UsersToken,
      expoPushTokenFB: arrayUnion(expoPushToken),
        });  
        } catch (error) {
            console.log(error, 'line 219');
           
        }
}
};

// Notifications



async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
         title: `${HomeTeam} vs ${AwayTeam}`  ,
      body: `${notificationBody} [${notificationNote}]`,
    //   data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
  handleSendUserTokentoDB()
}



async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token, 'token:line 217');
    handleSendUserTokentoDB()
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}




  


  const msgs=  UsersList.map((list, index) => JSON.parse(JSON
  .stringify({
    to: list,
     
       title: `${HomeTeam} vs ${AwayTeam}`  ,
      body: `${notificationBody} [${notificationNote}]`,
  })))

  

  // console.log(msgs,'line176');

  const SendNotificationToAllUsers = () => {
    let res = fetch("https://exp.host/--/api/v2/push/send", {
      method: 'POST',
      headers: {
        Accept: 'application/json',

'Content-Type': 'application/json'
      },
      body: 
        JSON.stringify( msgs),
      
      
    })
  }






//   Notification 

//   Notification 

      

  function functions(params) {
          navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
           <Header functions={functions} imgtype={require("../../assets/ba.png")}/>

  <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topSection}>
          <Text style={styles.topText}>Edit Match</Text>
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
                   onChangeText={(e) => {
             
             matchhInfoF({ ...matchhInfo, HomeTeam: e });
              }}
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
                    onChangeText={(e) => {
             
             matchhInfoF({ ...matchhInfo, AwayTeam: e });
              }}
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




{

    MatchActive ?    <View style={{flexDirection:'row', justifyContent: 'space-between'} }>
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

          </View> :
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
}





           
    <View style={{ marginTop: 10 }}>
            <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Notification
            </Text>

    <SelectDropdown
	data={notes}


      defaultButtonText ={ 'Notification'}
      buttonStyle={styles.dropdownStyle}
      buttonTextStyle={styles.dropdownStyleTxt}

	onSelect={(selectedItem, index) => {
	notificationBodyF(selectedItem);
	}}
	
   
/>
  </View>


  <View style={{ marginTop: 10, flex: 1 }}>

 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Notification Note
            </Text>

            <TextInput
              value={notificationNote}
                     onChangeText={(e) => {
             
             notificationNoteF(e);
              }}
              placeholder="Add Goal Scorer's Name"
             maxLength={6}
              style={styles.InputTextArea}
  
            />
          </View>

 

   <View style={{ marginTop: 10 }}>
            <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Match Summary
            </Text>

    <SelectDropdown
	data={Matchnotes}


      defaultButtonText ={ 'Match Summary'}
      buttonStyle={styles.dropdownStyle}
      buttonTextStyle={styles.dropdownStyleTxt}

	onSelect={(selectedItem, index) => {
	MatchBodyF(selectedItem);
	}}
	
   
/>
  </View>

 { MatchBody  && <View style={{ marginTop: 10, flex: 1 }}>

 <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Match Note
            </Text>

            <TextInput
              value={MatchNote}
                   onChangeText={(e) => {
             MatchNoteF(e)
           
              }}
              placeholder="Enter Match Summary"
          multiline

              style={styles.InputTextArea}
   
  
            />
          </View>}

          
        
  
        </KeyboardAvoidingView>
        <Text style={{ color: "red", alignSelf: "center", padding: 3 }}>
          {notification}
        </Text>
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnTxt}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnDelete} onPress={() => {handleDeleteMatch(matchId) 
        }}>
          <Text style={styles.btnTxt}>Delete Match</Text>
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
          paddingHorizontal: 10,
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
      btnDelete: {
        paddingVertical: 12,
        backgroundColor: "red",
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