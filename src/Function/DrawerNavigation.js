import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigations from './TabNavigation';
import ListofTeams from '../Backend/Team/ListofTeams';
import MatchList from '../Backend/Match/MatchList';
import TopPick from '../Backend/Top Pick/TopPick';
import Players from '../Backend/Player/Players';
import Credit from '../FrontEnd/Pages/Credit';



const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
   
      <Drawer.Navigator screenOptions={{
        headerShown: false,
      }} initialRouteName="Go Home">
        <Drawer.Screen name="Go Home" component={TabNavigations} />
      
        <Drawer.Screen name="Credits" component={Credit} />
      </Drawer.Navigator>
  
  );
}