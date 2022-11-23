import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext, useEffect } from "react";

import { MatchArray } from "../FrontEnd/Components/Match/MatchArray";
import { GroupArray } from "../FrontEnd/Components/Group/GroupState";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../Utils/Firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";


const AppContext = React.createContext();

const AppProvider = ({ children }) => {

  const [competition, competitionF] = useState(4)


    const [currentUser, currentUserF] = useState(null);
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

    // check if user is signed In
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            currentUserF(user);
          } else {
            currentUserF(null);
          }
        });
      }, []);

       //   logging out user
  const handleLogout = () => {
    signOut(auth).then(() => {
      currentUserF(null);
    });
  };


  // get list of teams from firebase 

  
  const [TeamsFromDBi, TeamsFromDBiF] = useState([]);


  const TeamsFromDB = TeamsFromDBi;
  TeamsFromDB.sort(function (a, b) {
    return a.dateId - b.dateId;
  });

  useEffect(() => {
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
  }, []);

    // to delete Teams
  const handleDeleteTeam = async (id) => {
    console.warn('sdhgghds');
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

  useEffect(() => {
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
  }, []);

    // to delete Matchs
  const handleDeleteMatch = async (id) => {
    console.warn('sdhgghds');
    // if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        loaderF(true);
        await deleteDoc(doc(db, "Matchs", id));
        loaderF(false);
        // toast.error("Blog successfully deleted");
      } catch (error) {
        console.log(error);
      }
    // }
  };






  const [Group, GroupF] = useState(GroupArray);

  //   BackEnd Group STage

  const [inputID, inputIDF] = useState(1);
  const [inputname, inputnameF] = useState("");
  const [inputMatches, inputMatchesF] = useState(0);
  const [inputWins, inputWinsF] = useState(0);
  const [inputLoss, inputLossF] = useState(0);
  const [inputDraw, inputDrawF] = useState(0);
  const [inputGoalD, inputGoalDF] = useState(0);
  const [inputpoints, inputpointsF] = useState(0);

  function inputnameFunction(e) {
    inputnameF(e);
  }

  function RankFunctionIncreasement(params) {
    inputIDF(inputID + 1);
  }
  function RankFunctionDecreasement(params) {
    inputIDF(inputID - 1);
  }
  function MatchPlayedFunctionIncreasement(params) {
    inputMatchesF(inputMatches + 1);
  }
  function MatchPlayedFunctionDecreasement(params) {
    if (inputMatches > 0) {
      inputMatchesF(inputMatches - 1);
    }
  }
  function WinsFunctionIncreasement(params) {
    inputWinsF(inputWins + 1);
  }
  function WinsFunctionDecreasement(params) {
    if (inputWins > 0) {
      inputWinsF(inputWins - 1);
    }
  }
  function LossFunctionIncreasement(params) {
    inputLossF(inputLoss + 1);
  }
  function LossFunctionDecreasement(params) {
    if (inputLoss > 0) {
      inputLossF(inputLoss - 1);
    }
  }
  function DrawFunctionIncreasement(params) {
    inputDrawF(inputDraw + 1);
  }
  function DrawFunctionDecreasement(params) {
    if (inputDraw > 0) {
      inputDrawF(inputDraw - 1);
    }
  }
  function GoalDFunctionIncreasement(params) {
    inputGoalDF(inputGoalD + 1);
  }
  function GoalDFunctionDecreasement(params) {
    if (inputGoalD > 0) {
      inputGoalDF(inputGoalD - 1);
    }
  }
  function pointsFunctionIncreasement(params) {
    inputpointsF(inputpoints + 1);
  }
  function pointsFunctionDecreasement(params) {
    if (inputpoints > 0) {
      inputpointsF(inputpoints - 1);
    }
  }

  const name = inputname.toLocaleUpperCase();

  function handlePress(name) {
    const rank = inputID;
    const gamePlay = inputMatches;
    const wins = inputWins;
    const draw = inputDraw;
    const loss = inputLoss;
    const GoalD = inputGoalD;
    const points = inputpoints;

    GroupF((prevState) => {
      return prevState.map((memee) => {
        return memee.name === name
          ? {
              ...memee,
              id: rank,
              played: gamePlay,
              won: wins,
              lost: loss,
              draw: draw,
              goalD: GoalD,
              points: points,
            }
          : { ...memee };
      });
    });
  }

  // Matches

  const [MatchState, MatchStateF] = useState(MatchArray);

  const [inputMatchID, inputMatchIDF] = useState("");
  const [inputFirstTeamScore, inputFirstTeamScoreF] = useState(0);
  const [inputSecondTeamScore, inputSecondTeamScoreF] = useState(0);
  const [inputGameState, inputGameStateF] = useState("");

  function inputMatchIDFunction(e) {
    inputMatchIDF(e);
  }
  function inputGameStateFunction(e) {
    inputGameStateF(e);
  }

  function FirstTeamScoreFunctionIncreasement(params) {
    inputFirstTeamScoreF(inputFirstTeamScore + 1);
  }
  function FirstTeamScoreFunctionDecreasement(params) {
    if (inputFirstTeamScore > 0) {
      inputFirstTeamScoreF(inputFirstTeamScore - 1);
    }
  }
  function SecondTeamScoreFunctionIncreasement(params) {
    inputSecondTeamScoreF(inputSecondTeamScore + 1);
  }
  function SecondTeamScoreFunctionDecreasement(params) {
    if (inputSecondTeamScore > 0) {
      inputSecondTeamScoreF(inputSecondTeamScore - 1);
    }
  }

  const matchID = inputMatchID.toLocaleUpperCase();

  function handleMatchPress(matchID) {
    const firstteamScoren = inputFirstTeamScore;
    const secondteamScoren = inputSecondTeamScore;
    const gamestate = inputGameState.toLocaleUpperCase();

    MatchStateF((prevState) => {
      return prevState.map((memee) => {
        return memee.id === matchID
          ? {
              ...memee,

              firstteamScore: firstteamScoren,
              secondteamScore: secondteamScoren,
              gamestate: gamestate,
            }
          : { ...memee };
      });
    });
    console.warn("success");

    inputMatchIDF("");
    inputGameStateF("");
    inputFirstTeamScoreF(0);
    inputSecondTeamScoreF(0);
  }

  return (
    <AppContext.Provider
      value={{
notification, notificationF, navigation,

currentUser, currentUserF,

loader, loaderF,

TeamsFromDB,

competition, competitionF,

handleDeleteTeam,

MatchsFromDB, 


handleDeleteMatch,



        Group,
        inputname,
        inputnameFunction,
        name,
        inputID,
        RankFunctionIncreasement,
        RankFunctionDecreasement,
        inputMatches,
        MatchPlayedFunctionIncreasement,
        MatchPlayedFunctionDecreasement,
        inputWins,
        WinsFunctionIncreasement,
        WinsFunctionDecreasement,
        inputDraw,
        DrawFunctionIncreasement,
        DrawFunctionDecreasement,
        inputLoss,
        LossFunctionIncreasement,
        LossFunctionDecreasement,
        inputGoalD,
        GoalDFunctionIncreasement,
        GoalDFunctionDecreasement,
        inputpoints,
        pointsFunctionIncreasement,
        pointsFunctionDecreasement,
        handlePress,
        MatchState,
        inputMatchID,
        inputMatchIDFunction,
        inputGameState,
        inputGameStateFunction,
        inputFirstTeamScore,
        FirstTeamScoreFunctionIncreasement,
        FirstTeamScoreFunctionDecreasement,
        inputSecondTeamScore,
        SecondTeamScoreFunctionIncreasement,
        SecondTeamScoreFunctionDecreasement,
        matchID,
        handleMatchPress,
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
