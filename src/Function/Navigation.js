// import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import UserSignInPage from "../Authentication/UserSignInPage";
import AddTeams from "../Backend/AddTeams";
import CreateMatch from "../Backend/CreateMatch";
import EditTeams from "../Backend/EditTeams";
import MatchInfo from "../Backend/MatchInfo";
import TeamStart from "../Backend/TeamStart";
import MatchResult from "../FrontEnd/Pages/MatchResult";
import { useGlobalContext } from "./Context";
// import Drawerr from "../FrontEnd/Pages/Drawer";
import DrawerNavigation from "./DrawerNavigation";




const Stack = createNativeStackNavigator();



const Navigations = () => {

  const {currentUser}= useGlobalContext()


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
      <Stack.Screen name="EditTeams" component={EditTeams} />
      <Stack.Screen name="Add Teams" component={AddTeams} />
      <Stack.Screen name="Create Match" component={CreateMatch} />
      <Stack.Screen name="MatchInfo" component={MatchInfo} />
      <Stack.Screen name="TeamStat" component={TeamStart} />
            <Stack.Screen name="MatchResult" component={MatchResult} />

      </>
       }

    
    </Stack.Navigator>
  );
};

export default Navigations;

const styles = StyleSheet.create({});
