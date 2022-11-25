import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useGlobalContext } from '../Function/Context'
import { addDoc, arrayUnion, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Utils/Firebase';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const UserSignInPage = () => {

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


        
  const [UsersToken, UsersTokenF] = useState([]);

      useEffect(() => {
  getUserDetail();
  }, []);


  const getUserDetail = async () => {
    const docRef = doc(db, "Users",  'Vgp5x0EfVAXtx8JM7yGx');
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      UsersTokenF({ ...snapshot.data() });
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



async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Engine Scores`  ,
      body: `Welcome`,
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




    const {currentUserF, storeData, getData} = useGlobalContext()

    useEffect(() => {
     getData()
    }, [])

  return (
    <SafeAreaView  style= {styles.container}>
        <TouchableOpacity onPress={() => {schedulePushNotification()
       storeData('true')
       currentUserF('true')
        }}>
  <Text>Click to Continue</Text>
        </TouchableOpacity>
    
    </SafeAreaView>
  )
}

export default UserSignInPage

const styles = StyleSheet.create({
      container: {
   flex: 1,
    backgroundColor: "#edeff2",
     paddingHorizontal: 15,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
 alignItems: 'center',
 justifyContent: 'center',
  },
})