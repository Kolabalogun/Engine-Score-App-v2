
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import UserSignInPage from "../Authentication/UserSignInPage";
import AddTeams from "../Backend/Team/AddTeams";
import CreateMatch from "../Backend/Match/CreateMatch";
import EditTeams from "../Backend/Team/EditTeams";
import MatchInfo from "../Backend/Match/MatchInfo";

import MatchResult from "../FrontEnd/Pages/MatchResult";
import { useGlobalContext } from "./Context";

import DrawerNavigation from "./DrawerNavigation";
import AdminNavigation from "./AdminNavigation";




const Stack = createNativeStackNavigator();



const Navigations = () => {

  const {currentUser, loader}= useGlobalContext()


  return (

    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"DrawerNavigation"}
    >

      {!currentUser ?   <Stack.Screen name="UserSignIn" component={UserSignInPage} />
:
<>
 
 


      <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
      <Stack.Screen name="AdminNavigation" component={AdminNavigation} />
      <Stack.Screen name="EditTeams" component={EditTeams} />
      <Stack.Screen name="Add Teams" component={AddTeams} />
      <Stack.Screen name="Create Match" component={CreateMatch} />
      <Stack.Screen name="MatchInfo" component={MatchInfo} />

            <Stack.Screen name="MatchResult" component={MatchResult} />

      </>


       }

    
    </Stack.Navigator>
  );
};

export default Navigations;

const styles = StyleSheet.create({});
