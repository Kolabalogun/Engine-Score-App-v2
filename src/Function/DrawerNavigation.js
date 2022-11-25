import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigations from './TabNavigation';
import ListofTeams from '../Backend/ListofTeams';
import MatchList from '../Backend/MatchList';
import TopPick from '../Backend/TopPick';
import Players from '../Backend/Players';



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