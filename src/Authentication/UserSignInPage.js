import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  View
} from "react-native";
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
      body: `Welcome to the League of Football`,
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
    <SafeAreaView style={styles.container}>
      <View style={styles.homeHeader}>
        <View style={styles.headerTitleDiv}>
          <Text style={styles.headerTitle}>
            Engine<Text style={styles.headerTitleScore}>Scores</Text>
          </Text>
        </View>
      </View>

      <Image source={require("../../assets/logo-no-bg.png")} />

      <Text>Get every minute Engineering Live Score here.</Text>
      <Text style={{ marginBottom: 10 }}>
        Gather fast info and go along with others.
      </Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            paddingVertical: 18,
            backgroundColor: "#ff2782",
            flexDirection: "row",
            flex: 1,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 15,
          }}
          onPress={() => {
            schedulePushNotification();
            storeData("true");
            currentUserF("true");
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            CLICK TO CONTINUE
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default UserSignInPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edeff2",
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
    alignItems: "center",
    justifyContent: "center",
  },

  homeHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },

  headerTitle: {
    fontSize: 36,
    fontWeight: "400",
  },

  headerTitleScore: {
    color: "#ff2782",
    fontWeight: "500",
  },
});