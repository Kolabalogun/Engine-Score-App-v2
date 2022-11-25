import { StyleSheet, Text, LogBox } from "react-native";
import React, { useState, useContext, useEffect } from "react";

import { MatchArray } from "../FrontEnd/Components/Match/MatchArray";
import { GroupArray } from "../FrontEnd/Components/Group/GroupState";
import { useNavigation } from "@react-navigation/native";
import {
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../Utils/Firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

const AppContext = React.createContext();

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

const AppProvider = ({ children }) => {
  const [competition, competitionF] = useState(4);

  const [notification, notificationF] = useState("");
  const [loader, loaderF] = useState("");

  //   notification
  useEffect(() => {
    const timeoutt = setTimeout(() => {
      notificationF("");
    }, 3000);

    return () => {
      clearInterval(timeoutt);
    };
  }, [notification]);

  const navigation = useNavigation();

  // get list of teams from firebase

  const [TeamsFromDBi, TeamsFromDBiF] = useState([]);

  const TeamsFromDB = TeamsFromDBi;
  TeamsFromDB.sort(function (a, b) {
    return a.dateId - b.dateId;
  });

  function getTeamsFromDB (params) {
      loaderF(true);
      const unsub = onSnapshot(
        collection(db, "Teams"),

        (snapshot) => {
          let list = [];

          snapshot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          TeamsFromDBiF(list);
          loaderF(false);
        },
        (error) => {
          console.log(error);
        }
      );

      return () => {
        unsub();
      };
  }

  useEffect(() => {
  getTeamsFromDB()
  }, []);
  // get list of users from firebase

  const [UsersToken, UsersTokenF] = useState("");

  useEffect(() => {
    getBlogDetail();
  }, []);

  const getBlogDetail = async () => {
    const docRef = doc(db, "Users", "Vgp5x0EfVAXtx8JM7yGx");
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      UsersTokenF({ ...snapshot.data() });
    }
  };

  // console.log( UsersToken, 'context line 137');

  // to delete Teams
  const handleDeleteTeam = async (id) => {
    // console.warn('sdhgghds');
    // if (window.confirm("Are you sure you want to delete this blog?")) {
    try {
      loaderF(true);
      await deleteDoc(doc(db, "Teams", id));
      loaderF(false);
      // toast.error("Blog successfully deleted");
    } catch (error) {
      console.log(error);
    }
    // }
  };

  // get list of teams from firebase

  const [MatchsFromDBi, MatchsFromDBiF] = useState([]);

  const MatchsFromDB = MatchsFromDBi;
  MatchsFromDB.sort(function (a, b) {
    return a.dateId - b.dateId;
  });


  const getMatchsFromDB =() => {

    loaderF(true);
    const unsub = onSnapshot(
      collection(db, "Matchs"),

      (snapshot) => {
        let list = [];

        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        MatchsFromDBiF(list);
        loaderF(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
 
    
  }

  useEffect(() => {
   getMatchsFromDB()
  }, []);

  // to delete Matchs
  const handleDeleteMatch = async (id) => {
    // console.warn('sdhgghds');
    // if (window.confirm("Are you sure you want to delete this blog?")) {
    try {
      loaderF(true);
      await deleteDoc(doc(db, "Matchs", id));
      loaderF(false);
      navigation.goBack();
      // toast.error("Blog successfully deleted");
    } catch (error) {
      console.log(error);
    }
    // }
  };

  // get list of top picks from firebase

  const [TopPicksDB, TopPicksDBF] = useState([]);

  function getTopPick(params) {
      loaderF(true);
      const unsub = onSnapshot(
        collection(db, "Top Pick"),

        (snapshot) => {
          let list = [];

          snapshot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          TopPicksDBF(list);
          loaderF(false);
        },
        (error) => {
          console.log(error);
        }
      );

      return () => {
        unsub();
      };
  }

  useEffect(() => {
   getTopPick()
  }, []);

  // check if there is internet connecttion
  const [online, onlineF] = useState(true);

  NetInfo.fetch().then((state) => {
    onlineF(state.isConnected);
  });

  if (!online) {
    alert("You have no Internet Connection!!");
  }

  const [currentUser, currentUserF] = useState(null);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@checkUserSignIn", value);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@checkUserSignIn");
      // console.log(value);
      if (value !== null) {
        currentUserF(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [competitionType, competitionTypeF] = useState("Engine 4.0");

  // refreshing

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getBlogDetail();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <AppContext.Provider
      value={{
        notification,
        notificationF,
        navigation,

        currentUser,
        currentUserF,

        loader,
        loaderF,

        TeamsFromDB,

        competition,
        competitionF,

        handleDeleteTeam,

        MatchsFromDB,

        handleDeleteMatch,

        online,
        UsersToken,
        storeData,
        getData,
        TopPicksDB,
        competitionType,
        competitionTypeF,

        getMatchsFromDB,
        getTopPick,
        getTeamsFromDB,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
