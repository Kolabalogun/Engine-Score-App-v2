import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigations from './TabNavigation';
import ListofTeams from '../Backend/Team/ListofTeams';
import MatchList from '../Backend/Match/MatchList';
import TopPick from '../Backend/Top Pick/TopPick';
import Players from '../Backend/Player/Players';



const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
   
      <Drawer.Navigator screenOptions={{
        headerShown: false,
      }} initialRouteName="DrawerHome">
        <Drawer.Screen name="DrawerHome" component={TabNavigations} />
        <Drawer.Screen name="Top Pick" component={TopPick} />
        <Drawer.Screen name="Team List" component={ListofTeams} />
        <Drawer.Screen name="MatchList" component={MatchList} />
        <Drawer.Screen name="Players" component={Players} />
      </Drawer.Navigator>
  
  );
}