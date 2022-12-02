import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigations from './TabNavigation';
import Credit from '../FrontEnd/Pages/Credit';
import ChangeTheme from '../FrontEnd/Pages/ChangeTheme';



const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
   
      <Drawer.Navigator screenOptions={{
        headerShown: false,
      }} initialRouteName="Go Home">
        <Drawer.Screen name="Go Home" component={TabNavigations} />
        <Drawer.Screen name="Change Theme" component={ChangeTheme} />
      
        <Drawer.Screen name="Credits" component={Credit} />
      </Drawer.Navigator>
  
  );
}